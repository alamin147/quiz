import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProfiles } from "@/hooks/useProfiles";
import { useAccessibility } from "@/hooks/useAccessibility";
import { useFacialRecognition } from "@/hooks/useFacialRecognition";
import { ArrowLeft, Camera, RotateCcw, Home, Play } from "lucide-react";
import { toast } from "sonner";
import sharingToyImage from "@/assets/scenarios/sharing-toy.png";
import feelingFrustratedImage from "@/assets/scenarios/feeling-frustrated.png";

const scenarioData = {
  "sharing-toy": {
    title: "The Toy Tug-of-War",
    image: sharingToyImage,
    story: "Oh no! Both Alex and Jamie want to play with the red car at the same time. They're both reaching for it!",
    choices: [
      { id: "share", text: "Say 'Let's take turns!'", isGood: true },
      { id: "grab", text: "Grab the toy first", isGood: false },
      { id: "walk-away", text: "Walk away sadly", isGood: false },
      { id: "ask-help", text: "Ask a grown-up for help", isGood: true },
    ]
  },
  "feeling-frustrated": {
    title: "Feeling Frustrated",
    image: feelingFrustratedImage,
    story: "Maya is trying to build a tower with blocks, but it keeps falling down. She's getting really frustrated and wants to give up.",
    choices: [
      { id: "keep-trying", text: "Take a deep breath and try again", isGood: true },
      { id: "throw-blocks", text: "Throw the blocks on the floor", isGood: false },
      { id: "ask-help", text: "Ask for help from a friend", isGood: true },
      { id: "give-up", text: "Say 'This is too hard!' and quit", isGood: false },
    ]
  }
};

type GameState = 'intro' | 'choices' | 'feedback' | 'outcome';

const ScenarioPlay = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [gameState, setGameState] = useState<GameState>('intro');
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);

  const { currentProfile, updateProfile } = useProfiles();
  const { speak, speakDescription } = useAccessibility();
  const {
    isActive,
    currentEmotion,
    isProcessing,
    startRecognition,
    stopRecognition,
    getEmotionFeedback
  } = useFacialRecognition();

  const scenario = id ? scenarioData[id as keyof typeof scenarioData] : null;

  // Memoize functions to prevent unnecessary re-renders
  const handleSpeakIntro = useCallback(() => {
    if (scenario && !hasSpokenIntro) {
      speak(`Starting ${scenario.title}. Listen carefully to the story!`);
      speakDescription(`Interactive scenario: ${scenario.title}. You'll make choices and practice facial expressions.`);
      setHasSpokenIntro(true);
    }
  }, [scenario, speak, speakDescription, hasSpokenIntro]);

  // Intro speech effect - only run once
  useEffect(() => {
    handleSpeakIntro();
  }, [handleSpeakIntro]);

  // Facial recognition effect - with proper cleanup
  useEffect(() => {
    if (gameState === 'choices' && !showFeedback) {
      const timer = setTimeout(() => {
        startRecognition();
        speak("Look at the camera so I can see your expressions! Now, what would you do?");
      }, 500);

      return () => {
        clearTimeout(timer);
        stopRecognition();
      };
    } else {
      stopRecognition();
    }
  }, [gameState, showFeedback]); // Removed speak, startRecognition, stopRecognition from deps

  const provideFeedback = useCallback((choiceId: string) => {
    const choice = scenario?.choices.find(c => c.id === choiceId);
    if (!choice) return;

    const emotionFeedback = getEmotionFeedback(currentEmotion);

    let message = "";
    if (choice.isGood) {
      if (currentEmotion === 'happy' || currentEmotion === 'excited') {
        message = `${emotionFeedback.message} That was a wonderful choice! You're being very kind!`;
        toast.success("Great job! Excellent choice and expression!");
      } else {
        message = `That was a good choice! ${emotionFeedback.message}`;
        toast.success("Good choice! Try showing how you feel with your face!");
      }
    } else {
      if (currentEmotion === 'sad' || currentEmotion === 'frustrated') {
        message = `${emotionFeedback.message} That choice might hurt someone's feelings. What else could we do?`;
      } else {
        message = `Hmm, that choice might not be the kindest. ${emotionFeedback.message}`;
      }
      toast("Think about how others might feel");
    }

    speak(message);
  }, [scenario, getEmotionFeedback, currentEmotion, speak]);

  const handleChoiceSelect = useCallback((choiceId: string) => {
    if (selectedChoice) return; // Prevent multiple selections

    setSelectedChoice(choiceId);
    const choice = scenario?.choices.find(c => c.id === choiceId);
    if (choice) {
      speak(`You chose: ${choice.text}`);
    }

    // Wait a moment for facial recognition to capture expression
    const timer = setTimeout(() => {
      setShowFeedback(true);
      provideFeedback(choiceId);
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedChoice, scenario, speak, provideFeedback]);

  const handleRetry = useCallback(() => {
    setSelectedChoice(null);
    setShowFeedback(false);
    setGameState('choices');
    speak("Let's try again! What would you do?");
  }, [speak]);

  const handleContinue = useCallback(() => {
    setGameState('outcome');

    const choice = scenario?.choices.find(c => c.id === selectedChoice);
    if (!choice) return;

    if (choice.isGood) {
      speak("Look how happy everyone is! Making good choices helps everyone feel better. Great job!");
      if (currentProfile) {
        updateProfile(currentProfile.id, {
          scenariosCompleted: currentProfile.scenariosCompleted + 1
        });
      }
    } else {
      speak("This choice made someone feel sad. But that's okay - we can learn and try again!");
    }
  }, [scenario, selectedChoice, speak, currentProfile, updateProfile]);

  const handlePlayAnother = useCallback(() => {
    speak("Let's choose another story to practice!");
    navigate("/scenarios");
  }, [speak, navigate]);

  const handleGoHome = useCallback(() => {
    speak("Going back to choose profiles");
    navigate("/profiles");
  }, [speak, navigate]);

  const handleBackToScenarios = useCallback(() => {
    navigate("/scenarios");
  }, [navigate]);

  // Loading state for invalid scenario
  if (!scenario) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 flex items-center justify-center">
        <Card className="p-8 text-center bg-white shadow-xl border-2 border-blue-200 rounded-3xl max-w-md">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Story Not Found</h2>
          <p className="text-blue-600 mb-6">This story isn't available right now</p>
          <Button
            onClick={handleBackToScenarios}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Choose Another Story
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBackToScenarios}
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-xl"
          aria-label="Go back to scenario selection"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>

        <div className="text-center">
          <h1 className="text-xl font-bold text-blue-700">{scenario.title}</h1>
        </div>

        <div className="w-10" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Facial Recognition Indicator */}
        {isActive && (
          <Card className="p-4 mb-6 bg-blue-50 border-blue-200 border-2 animate-pulse shadow-lg rounded-2xl">
            <div className="flex items-center justify-center gap-2">
              <Camera className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-medium">
                {isProcessing ? "Looking for your expression..." : "Watching your expressions"}
              </span>
              {currentEmotion && (
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  {currentEmotion}
                </span>
              )}
            </div>
          </Card>
        )}

        {/* Intro State */}
        {gameState === 'intro' && (
          <Card className="p-8 text-center shadow-xl bg-white border-2 border-blue-200 rounded-3xl">
            <div className="w-64 h-48 mx-auto mb-6 rounded-2xl shadow-lg border-2 border-blue-100 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
              {scenario.image ? (
                <img
                  src={scenario.image}
                  alt={scenario.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `
                      <div class="text-6xl text-blue-400">🎭</div>
                      <p class="text-blue-600 text-sm mt-2">${scenario.title}</p>
                    `;
                  }}
                />
              ) : (
                <div className="text-center">
                  <div className="text-6xl text-blue-400 mb-2">🎭</div>
                  <p className="text-blue-600 text-sm">{scenario.title}</p>
                </div>
              )}
            </div>

            <div className="mb-6">
              <div className="text-5xl mb-4">🎭</div>
              <p className="text-lg text-blue-700 leading-relaxed font-medium">
                {scenario.story}
              </p>
            </div>

            <div className="text-center mb-6">
              <p className="text-blue-600 font-medium mb-2">
                Look at the camera so I can see your happy face! 📹
              </p>
              <Camera className="w-8 h-8 text-blue-500 mx-auto animate-bounce" />
            </div>

            <Button
              size="lg"
              onClick={() => setGameState('choices')}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xl py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              What would you do? ✨
            </Button>
          </Card>
        )}

        {/* Choices State */}
        {gameState === 'choices' && !showFeedback && (
          <div className="space-y-6">
            <Card className="p-6 bg-white shadow-lg border-2 border-blue-200 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">🤔</div>
                <p className="text-lg font-medium text-blue-700">
                  What would you do? Choose the best option:
                </p>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {scenario.choices.map((choice, index) => (
                <Card
                  key={choice.id}
                  className={`p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 bg-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl rounded-2xl ${
                    selectedChoice === choice.id ? 'ring-4 ring-blue-400 border-blue-500 scale-105 shadow-xl' : ''
                  }`}
                  onClick={() => handleChoiceSelect(choice.id)}
                >
                  <div className="text-left">
                    <div className="text-2xl mb-3">
                      {choice.isGood ? '✨' : '🤨'}
                    </div>
                    <p className="text-lg font-medium text-blue-700 leading-relaxed">
                      {choice.text}
                    </p>
                    {selectedChoice === choice.id && (
                      <div className="mt-3 text-blue-500 font-medium">
                        ✓ You chose this option
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {selectedChoice && (
              <div className="text-center mt-6">
                <p className="text-blue-600 font-medium mb-4">
                  Great! I can see your expression. Let me give you feedback...
                </p>
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
              </div>
            )}
          </div>
        )}

        {/* Feedback State */}
        {showFeedback && (
          <Card className="p-8 text-center shadow-xl bg-white border-2 border-blue-200 rounded-3xl">
            <div className="mb-6">
              <div className="text-6xl mb-4">
                {scenario.choices.find(c => c.id === selectedChoice)?.isGood ? '🎉' : '🤔'}
              </div>

              {currentEmotion && (
                <div className="mb-4">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                    getEmotionFeedback(currentEmotion).type === 'positive'
                      ? 'bg-green-100 text-green-700 border-2 border-green-200'
                      : getEmotionFeedback(currentEmotion).type === 'negative'
                      ? 'bg-orange-100 text-orange-700 border-2 border-orange-200'
                      : 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                  }`}>
                    <span className="text-2xl">
                      {currentEmotion === 'happy' ? '😊' :
                       currentEmotion === 'sad' ? '😢' :
                       currentEmotion === 'frustrated' ? '😤' :
                       currentEmotion === 'excited' ? '🤩' : '😐'}
                    </span>
                    <span className="font-medium">{getEmotionFeedback(currentEmotion).message}</span>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-blue-700 mb-2">
                  {scenario.choices.find(c => c.id === selectedChoice)?.isGood
                    ? "Great choice!" : "Let's think about this..."}
                </h3>
                <p className="text-lg text-blue-600">
                  {scenario.choices.find(c => c.id === selectedChoice)?.isGood
                    ? "That was a kind and thoughtful decision!"
                    : "How do you think this might make others feel?"}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={handleRetry}
                className="border-2 border-blue-300 text-blue-600 hover:bg-blue-50 rounded-2xl"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button
                onClick={handleContinue}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-2xl"
              >
                See What Happens ✨
              </Button>
            </div>
          </Card>
        )}

        {/* Outcome State */}
        {gameState === 'outcome' && (
          <Card className="p-8 text-center shadow-xl bg-white border-2 border-blue-200 rounded-3xl">
            <img
              src={scenario.image}
              alt="Story outcome"
              className="w-64 h-48 object-cover rounded-2xl mx-auto mb-6 shadow-lg border-2 border-blue-100"
            />

            <div className="mb-6">
              <div className="text-6xl mb-4">
                {scenario.choices.find(c => c.id === selectedChoice)?.isGood ? '🎉' : '💭'}
              </div>

              <div className="space-y-2">
                {scenario.choices.find(c => c.id === selectedChoice)?.isGood ? (
                  <>
                    <h2 className="text-2xl font-bold text-green-600">Wonderful Job! 🌟</h2>
                    <p className="text-lg text-blue-700">Your kind choice made everyone happy!</p>
                    <div className="flex justify-center gap-1 mt-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <span key={i} className="text-3xl animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>⭐</span>
                      ))}
                    </div>
                    <p className="text-blue-600 mt-4">You're learning to be a great friend! 💙</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-orange-600">Let's Learn Together 🤝</h2>
                    <p className="text-lg text-blue-700">That choice might hurt feelings. What else could we try?</p>
                    <p className="text-blue-600 mt-2">Remember: Kind choices help everyone feel better! 💕</p>
                    <div className="text-4xl mt-4">🤗</div>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Button
                size="lg"
                onClick={handlePlayAnother}
                className="w-full mb-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white  py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-xs md:text-md"
              >Play Another Story
              </Button>
              <Button
                variant="outline"
                onClick={handleGoHome}
                className="border-2 border-blue-300 text-blue-600 hover:bg-blue-50 rounded-2xl text-xs md:text-md"
              >
                <Home className="w-4 h-4 mr-2" />
                Choose Different Profile
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ScenarioPlay;
