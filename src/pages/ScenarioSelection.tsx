import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProfiles } from "@/hooks/useProfiles";
import { useAccessibility } from "@/hooks/useAccessibility";
import { ArrowLeft, Play, Star, Settings, Home } from "lucide-react";
import { useEffect } from "react";
import sharingToyImage from "@/assets/scenarios/sharing-toy.png";
import feelingFrustratedImage from "@/assets/scenarios/feeling-frustrated.png";

const scenarios = [
  {
    id: "sharing-toy",
    title: "The Toy Tug-of-War",
    description: "Two friends both want to play with the same toy car",
    image: sharingToyImage,
    category: "Sharing with Friends",
    difficulty: "Easy",
    completed: false,
    stars: 0,
  },
  {
    id: "feeling-frustrated",
    title: "Feeling Frustrated",
    description: "Learning to handle big feelings when things don't go as planned",
    image: feelingFrustratedImage,
    category: "Handling Big Feelings",
    difficulty: "Medium",
    completed: false,
    stars: 0,
  },
  {
    id: "making-friends",
    title: "Making New Friends",
    description: "How to approach and talk to someone new at school",
    image: sharingToyImage, // Reuse for demo
    category: "School Adventures",
    difficulty: "Easy",
    completed: true,
    stars: 3,
  },
  {
    id: "helping-others",
    title: "Lending a Helping Hand",
    description: "Seeing when someone needs help and offering to assist",
    image: feelingFrustratedImage, // Reuse for demo
    category: "Kindness",
    difficulty: "Medium",
    completed: true,
    stars: 2,
  },
];

const categories = [
  "All Stories",
  "Sharing with Friends",
  "Handling Big Feelings",
  "School Adventures",
  "Kindness"
];

const ScenarioSelection = () => {
  const navigate = useNavigate();
  const { currentProfile } = useProfiles();
  const { speak, speakDescription } = useAccessibility();

  useEffect(() => {
    if (currentProfile) {
      speak(`Welcome back, ${currentProfile.name}! Choose a story to practice with friends and feelings.`);
      speakDescription("Scenario selection screen showing different social stories to practice");
    }
  }, [speak, speakDescription, currentProfile]);

  const handleScenarioSelect = (scenario: any) => {
    speak(`Starting ${scenario.title}. Get ready to practice making good choices!`);
    navigate(`/scenario/${scenario.id}`);
  };

  const handleBack = () => {
    speak("Going back to choose a different profile");
    navigate("/profiles");
  };

  const handleSettings = () => {
    speak("Opening settings");
    navigate("/settings");
  };

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">No Profile Selected</h2>
          <p className="text-blue-600 mb-4">Please select a profile to continue</p>
          <Button onClick={() => navigate("/profiles")} className="bg-blue-500 hover:bg-blue-600">
            Select Profile
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
          onClick={handleBack}
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-100"
          aria-label="Go back to profile selection"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>

        <div className="text-center">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg border-2 border-blue-200">
            <span className="text-2xl">{currentProfile.avatar}</span>
            <span className="font-semibold text-blue-700">{currentProfile.name}</span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleSettings}
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-100"
          aria-label="Settings"
        >
          <Settings className="w-6 h-6" />
        </Button>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent mb-4">
            Choose Your Adventure
          </h1>
          <p className="text-xl text-blue-600">
            Practice making good choices with friends and feelings! 🌟
          </p>
        </div>

        {/* Progress Summary */}
        <Card className="p-6 mb-8 shadow-lg animate-scale-in bg-white border-2 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1 text-blue-700">Your Progress</h3>
              <p className="text-blue-600">
                {scenarios.filter(s => s.completed).length} of {scenarios.length} stories completed! 🎉
              </p>
            </div>
            <div className="flex gap-1">
              {scenarios.map((scenario, index) => (
                <div key={index} className="flex">
                  {Array.from({ length: scenario.stars }).map((_, starIndex) => (
                    <Star key={starIndex} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario, index) => (
            <Card
              key={scenario.id}
              className="overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-scale-in bg-white border-2 border-blue-200 hover:border-blue-400"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleScenarioSelect(scenario)}
            >
              <div className="aspect-video bg-muted overflow-hidden">
                <img
                  src={scenario.image}
                  alt={scenario.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {scenario.category}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    scenario.difficulty === 'Easy'
                      ? 'text-success bg-success/10'
                      : 'text-warning bg-warning/10'
                  }`}>
                    {scenario.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">
                  {scenario.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4">
                  {scenario.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {scenario.completed ? (
                      <>
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < scenario.stars
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </>
                    ) : (
                      <span className="text-xs text-muted-foreground">Not started</span>
                    )}
                  </div>

                  <Button
                    size="sm"
                    variant={scenario.completed ? "success" : "default"}
                    className="gap-1"
                  >
                    <Play className="w-3 h-3" />
                    {scenario.completed ? "Play Again" : "Start"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            onClick={handleBack}
            className="mr-4"
          >
            <Home className="w-4 h-4 mr-2" />
            Choose Different Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScenarioSelection;
