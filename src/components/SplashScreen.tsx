import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, Accessibility, Heart, Star, Sparkles } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [loading, setLoading] = useState(true);
  const [showAccessibilityPrompt, setShowAccessibilityPrompt] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate app initialization with progress
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 20;
      });
    }, 600);

    // Immediate accessibility announcement
    const utterance = new SpeechSynthesisUtterance(
      "Welcome to EmoStory! Tap the accessibility icon for special options"
    );
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);

    return () => clearInterval(progressInterval);
  }, []);

  const handleAccessibilityClick = () => {
    setShowAccessibilityPrompt(true);
  };

  const handleContinue = () => {
    if (loading) return;
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-20 animate-float-up-down"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              fontSize: `${2 + Math.random() * 2}rem`
            }}
          >
            {['🌟', '�', '�', '✨', '🦋', '💎', '🔮', '💫', '⭐', '🌙', '❄️', '🌀'][i]}
          </div>
        ))}
      </div>

      {/* Accessibility Button - Always Visible */}
      <div className="absolute top-6 right-6 z-10 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <Button
          onClick={handleAccessibilityClick}
          className="bg-white/95 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 text-blue-700 hover:text-blue-800 border-2 border-blue-200 hover:border-blue-400 focus-enhanced animate-pulse-grow"
          variant="outline"
          size="lg"
          aria-label="Accessibility options"
        >
          <Accessibility className="h-6 w-6 mr-2" />
          <Volume2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Main Logo Area */}
      <div className="text-center space-y-8 animate-fade-in">
        {/* App Logo - Friendly Characters in Circle */}
        <div className="relative">
          <div className="w-64 h-64 mx-auto bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-full shadow-2xl flex items-center justify-center border-4 border-blue-200/70 animate-float-slow animate-glow-pulse">
            <div className="text-8xl animate-rainbow filter drop-shadow-lg">
              🌟
            </div>
          </div>

          {/* Friendly characters around the logo */}
          <div className="absolute -top-6 -left-6 text-5xl animate-wiggle bg-gradient-to-br from-white to-blue-100 rounded-full p-3 shadow-xl border-2 border-blue-200/50">😊</div>
          <div className="absolute -top-6 -right-6 text-5xl animate-wiggle bg-gradient-to-br from-white to-blue-200 rounded-full p-3 shadow-xl border-2 border-blue-200/50" style={{ animationDelay: '0.5s' }}>🤗</div>
          <div className="absolute -bottom-6 -left-6 text-5xl animate-wiggle bg-gradient-to-br from-white to-blue-150 rounded-full p-3 shadow-xl border-2 border-blue-200/50" style={{ animationDelay: '1s' }}>😄</div>
          <div className="absolute -bottom-6 -right-6 text-5xl animate-wiggle bg-gradient-to-br from-white to-indigo-100 rounded-full p-3 shadow-xl border-2 border-blue-200/50" style={{ animationDelay: '1.5s' }}>🌈</div>
        </div>

        {/* App Title */}
        <div className="space-y-6">
          <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text  aniate-shimmer drop-shadow-2xl">
            EmoStory
          </h1>
          <p className="text-3xl text-blue-600 font-medium animate-fade-in animate-pulse-grow" style={{ animationDelay: '0.3s' }}>
            Learn about feelings and friends! 💫
          </p>
        </div>

        {/* Loading Animation */}
        {loading && (
          <div className="space-y-6 animate-bounce-in">
            <div className="flex items-center justify-center space-x-4">
              <div className="character-skip text-5xl">🚶‍♀️</div>
              <Heart className="h-8 w-8 text-blue-500 animate-pulse" />
              <Star className="h-8 w-8 text-indigo-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <Sparkles className="h-8 w-8 text-blue-600 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <p className="text-xl text-blue-600 font-semibold">
              Loading EmoStory... {loadingProgress}%
            </p>
            {/* Progress bar */}
            <div className="w-64 mx-auto bg-white/50 rounded-full h-3 shadow-inner">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Continue Button */}
        {!loading && (
          <div className="animate-bounce-in" style={{ animationDelay: '0.5s' }}>
            <Button
              onClick={handleContinue}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-2xl px-16 py-8 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-4 border-white/30"
              aria-label="Start EmoStory adventure"
            >
              Let's Begin! ✨
            </Button>
          </div>
        )}
      </div>

      {/* Enhanced Accessibility Settings Popup */}
      {showAccessibilityPrompt && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 max-w-lg w-full space-y-8 shadow-2xl border-4 border-white/50 animate-scale-in">
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Accessibility Options
              </h2>
              <p className="text-blue-600 mt-2">Make EmoStory perfect for you!</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/70 rounded-2xl shadow-sm">
                <div className="flex items-center space-x-3">
                  <Volume2 className="h-6 w-6 text-blue-500" />
                  <label className="text-lg font-medium text-blue-700">Read text aloud</label>
                </div>
                <input
                  type="checkbox"
                  className="w-6 h-6 rounded text-blue-500 focus:ring-blue-500 focus:ring-2"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white/70 rounded-2xl shadow-sm">
                <div className="flex items-center space-x-3">
                  <Accessibility className="h-6 w-6 text-indigo-500" />
                  <label className="text-lg font-medium text-blue-700">Describe visuals</label>
                </div>
                <input
                  type="checkbox"
                  className="w-6 h-6 rounded text-indigo-500 focus:ring-indigo-500 focus:ring-2"
                />
              </div>

              <div className="p-4 bg-white/70 rounded-2xl shadow-sm space-y-3">
                <label className="text-lg font-medium text-blue-700 flex items-center space-x-3">
                  <Sparkles className="h-6 w-6 text-blue-500" />
                  <span>Speaking speed</span>
                </label>
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">🐢</span>
                  <input
                    type="range"
                    className="flex-1 h-3 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full appearance-none slider-thumb"
                    defaultValue="50"
                  />
                  <span className="text-3xl">🐰</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setShowAccessibilityPrompt(false)}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-xl py-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              size="lg"
            >
              Done! Let's Go! 🎉
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
