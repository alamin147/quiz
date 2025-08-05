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

  // Mock profile data with diverse characters - updated with bluish color scheme
  const mockProfiles = [
    { id: '1', name: 'Alex', avatar: '👦', color: 'from-blue-400 to-blue-600', progress: 75, lastPlayed: 'Sharing Stories' },
    { id: '2', name: 'Maya', avatar: '👧', color: 'from-indigo-400 to-indigo-600', progress: 90, lastPlayed: 'Making Friends' },
    { id: '3', name: 'Sam', avatar: '🧒', color: 'from-blue-500 to-indigo-500', progress: 60, lastPlayed: 'Big Feelings' },
  ];

  const allProfiles = profiles.length > 0 ? profiles : mockProfiles;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 p-6 relative overflow-hidden">
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
            {['⭐', '🌟', '💫', '✨', '💙', '�'][i]}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 relative z-10 gap-4">
        <Button
          variant="ghost"
          size="lg"
          onClick={() => navigate("/")}
          className="bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 hover:text-blue-600 w-full sm:w-auto justify-center sm:justify-start"
          aria-label="Go back to welcome screen"
        >
          <ArrowLeft className="w-3 h-3 mr-2" />
          Back
        </Button>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          <Button
            variant="ghost"
            size="lg"
            onClick={handleSettings}
            className="bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 text-blue-700 hover:text-blue-800 w-full sm:w-auto justify-center sm:justify-start"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4 sm:w-6 sm:h-6 mr-2" />
            <span className="hidden sm:inline">Settings</span>
            <span className="sm:hidden">Settings</span>
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={handleParentLogin}
            className="bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 text-indigo-700 hover:text-indigo-800 w-full sm:w-auto justify-center sm:justify-start"
            aria-label="Parent and therapist login"
          >
            <Lock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="hidden sm:inline">Parent Login</span>
            <span className="sm:hidden">Parent</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Welcome Message */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-4 animate-float-gentle">👋</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent mb-4">
            Who's Playing Today?
          </h1>
          <p className="text-2xl text-blue-600 font-medium">
            Choose your profile or create a new one! 🌟
          </p>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
          {allProfiles.map((profile, index) => (
            <Card
              key={profile.id}
              className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group animate-fade-in bg-white rounded-3xl shadow-lg border-2 border-blue-200 hover:border-blue-400 ${
                selectedProfile === profile.id ? 'scale-105 shadow-2xl ring-4 ring-blue-400' : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => handleProfileSelect(profile)}
            >
              {/* Top Section - Avatar and Main Info */}
              <div className={`bg-gradient-to-br ${profile.color} p-8 text-center text-white relative rounded-t-3xl`}>
                {/* Avatar */}
                <div className="text-8xl mb-4 animate-bounce-gentle group-hover:animate-pulse-grow filter drop-shadow-lg">
                  {profile.avatar}
                </div>

                {/* Name */}
                <h3 className="text-blue-600 text-3xl font-bold mb-2 drop-shadow-md">{profile.name}</h3>

                {/* Progress Stars */}
                <div className="flex justify-center space-x-1 mb-3  ">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(profile.progress / 20) ? 'text-yellow-300 fill-current' : 'text-white/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Last Played */}
                <p className="text-white/90 text-sm font-medium">
                  Last: {profile.lastPlayed}
                </p>

                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 text-3xl opacity-70 animate-wiggle">
                  ✨
                </div>
                <div className="absolute -bottom-2 -left-2 text-3xl opacity-70 animate-wiggle" style={{ animationDelay: '1s' }}>
                  💫
                </div>
              </div>

              {/* Bottom Section - Progress Bar */}
              <div className="bg-white p-6 rounded-b-3xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-blue-600 font-semibold">Progress</span>
                  <span className="text-2xl font-bold text-indigo-600">{profile.progress}%</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-4 shadow-inner">
                  <div
                    className={`bg-gradient-to-r ${profile.color} h-4 rounded-full transition-all duration-500 shadow-sm`}
                    style={{ width: `${profile.progress}%` }}
                  />
                </div>
                <p className="text-center mt-3 text-blue-500 font-medium">
                  Tap to continue! 🚀
                </p>
              </div>
            </Card>
          ))}

          {/* Add New Profile Card */}
          <Card
            className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group border-3 border-dashed border-blue-300 hover:border-blue-500 animate-fade-in bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl"
            style={{ animationDelay: `${allProfiles.length * 0.2}s` }}
            onClick={handleCreateProfile}
          >
            {/* Top Section */}
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-8 text-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300 rounded-t-3xl">
              <div className="text-8xl mb-4 animate-bounce-gentle group-hover:animate-pulse-grow">
                <Plus className="w-20 h-20 mx-auto text-blue-400 group-hover:text-blue-600 transition-colors duration-300" />
              </div>

              <h3 className="text-3xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300 mb-2 drop-shadow-sm">
                Add New Friend!
              </h3>

              <div className="flex justify-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-blue-300 opacity-50"
                  />
                ))}
              </div>

              <p className="text-blue-500 text-sm font-medium">
                Ready to start!
              </p>

              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 text-3xl opacity-50 animate-wiggle group-hover:opacity-100 transition-opacity duration-300">
                🌟
              </div>
              <div className="absolute -bottom-2 -left-2 text-3xl opacity-50 animate-wiggle group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '1s' }}>
                ✨
              </div>
            </div>

            {/* Bottom Section */}
            <div className="bg-white p-6 rounded-b-3xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-blue-600 font-semibold">Create Profile</span>
                <span className="text-2xl font-bold text-indigo-600">New!</span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-4 shadow-inner">
                <div className="bg-gradient-to-r from-blue-300 to-indigo-300 h-4 rounded-full w-0 group-hover:w-full transition-all duration-1000 shadow-sm" />
              </div>
              <p className="text-center mt-3 text-blue-500 font-medium">
                Start your journey! 🎉
              </p>
            </div>
          </Card>
        </div>

        {/* Character mascot encouragement */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="inline-flex items-center bg-white/90 rounded-3xl p-6 shadow-xl">
            <div className="text-5xl mr-4 animate-wiggle">😊</div>
            <div className="text-left">
              <p className="text-xl font-semibold text-blue-700">Ready for an adventure?</p>
              <p className="text-blue-600">Pick your profile and let's learn together!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelection;
