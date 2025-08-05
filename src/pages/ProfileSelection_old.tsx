import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProfiles } from "@/hooks/useProfiles";
import { useAccessibility } from "@/hooks/useAccessibility";
import { Plus, ArrowLeft, Lock, Settings, Star, Heart } from "lucide-react";
import { useEffect, useState } from "react";

const ProfileSelection = () => {
  const navigate = useNavigate();
  const { profiles, selectProfile } = useProfiles();
  const { speak, speakDescription } = useAccessibility();
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  useEffect(() => {
    speak("Who is playing today? Choose your profile or create a new one!");
    speakDescription("Profile selection screen with child avatars and options for parents");
  }, [speak, speakDescription]);

  const handleProfileSelect = (profile: any) => {
    setSelectedProfile(profile.id);
    setTimeout(() => {
      selectProfile(profile.id);
      speak(`Welcome back, ${profile.name}! Let's play!`);
      navigate("/scenarios");
    }, 300);
  };

  const handleCreateProfile = () => {
    speak("Let's create a new profile for you!");
    navigate("/create-profile");
  };

  const handleParentLogin = () => {
    speak("Parent and therapist login");
    navigate("/parent-login");
  };

  const handleSettings = () => {
    speak("Opening settings");
    navigate("/settings");
  };

  // Mock profile data with diverse characters
  const mockProfiles = [
    { id: '1', name: 'Alex', avatar: '👦', color: 'from-blue-400 to-blue-600', progress: 75, lastPlayed: 'Sharing Stories' },
    { id: '2', name: 'Maya', avatar: '👧', color: 'from-pink-400 to-pink-600', progress: 90, lastPlayed: 'Making Friends' },
    { id: '3', name: 'Sam', avatar: '🧒', color: 'from-green-400 to-green-600', progress: 60, lastPlayed: 'Big Feelings' },
  ];

  const allProfiles = profiles.length > 0 ? profiles : mockProfiles;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 bg-pattern p-6 relative overflow-hidden">
      {/* Background floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-3xl opacity-20 animate-float-up-down"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.2}s`,
            }}
          >
            {['⭐', '🌟', '💫', '✨', '🌈', '💖'][i]}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8 relative z-10">
        <Button
          variant="ghost"
          size="lg"
          onClick={() => navigate("/")}
          className="bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 hover:text-blue-600"
          aria-label="Go back to welcome screen"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          Back
        </Button>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleSettings}
          aria-label="Settings"
        >
          <Settings className="w-6 h-6" />
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Who is Playing?
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose your profile to start your adventure!
          </p>
        </div>

        {/* Child Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {profiles.map((profile, index) => (
            <Card
              key={profile.id}
              className="p-6 text-center cursor-pointer shadow-card hover:shadow-glow transition-all duration-300 transform hover:scale-105 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleProfileSelect(profile)}
            >
              <div className="w-24 h-24 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center text-4xl text-primary-foreground">
                {profile.avatar || profile.name.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {profile.name}
              </h3>
              <p className="text-muted-foreground text-sm">
                {profile.scenariosCompleted} scenarios completed
              </p>
              <div className="flex justify-center mt-2">
                {Array.from({ length: Math.min(5, profile.scenariosCompleted) }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">⭐</span>
                ))}
              </div>
            </Card>
          ))}

          {/* Add New Profile Card */}
          <Card
            className="p-6 text-center cursor-pointer border-2 border-dashed border-primary/30 hover:border-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105 animate-scale-in"
            style={{ animationDelay: `${profiles.length * 0.1}s` }}
            onClick={handleCreateProfile}
          >
            <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Plus className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Add New Child
            </h3>
            <p className="text-muted-foreground text-sm">
              Create a new profile
            </p>
          </Card>
        </div>

        {/* Parent/Therapist Login */}
        <div className="text-center animate-fade-in">
          <Button
            variant="outline"
            onClick={handleParentLogin}
            className="text-sm"
          >
            <Lock className="w-4 h-4 mr-2" />
            Parent/Therapist Login
          </Button>
        </div>

        {/* Instructions for empty state */}
        {profiles.length === 0 && (
          <div className="text-center mt-12 animate-fade-in">
            <div className="text-6xl mb-4">🌟</div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Welcome to EmoStory!
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Let's create your first profile to start learning about emotions and making friends!
            </p>
            <Button
              variant="child"
              size="child"
              onClick={handleCreateProfile}
            >
              Create My Profile
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSelection;
