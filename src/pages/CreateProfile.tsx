import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useProfiles } from "@/hooks/useProfiles";
import { useAccessibility } from "@/hooks/useAccessibility";
import { ArrowLeft, User } from "lucide-react";
import { useEffect } from "react";

const avatars = [
  "🦄", "🐻", "🦊", "🐰", "🐼", "🦝", "🐨", "🐸",
  "🐛", "🦋", "🐙", "🐠", "🌟", "🌈", "🎈", "🎨"
];

const CreateProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const { addProfile } = useProfiles();
  const { speak, speakDescription, textToSpeech, talkOverVoice } = useAccessibility();

  useEffect(() => {
    // Check TTS support
    const ttsSupported = 'speechSynthesis' in window;
    console.log('TTS Support Check:', {
      ttsSupported,
      textToSpeech,
      talkOverVoice,
      speechSynthesis: window.speechSynthesis
    });

    // Wait a moment for speech synthesis to initialize
    setTimeout(() => {
      speak("Let's create your profile! What's your name, superstar?");
      speakDescription("Profile creation screen with name input and avatar selection");
    }, 500);
  }, [speak, speakDescription, textToSpeech, talkOverVoice]);

  const handleCreateProfile = () => {
    if (!name.trim()) {
      speak("Please enter your name first!");
      return;
    }

    if (!selectedAvatar) {
      speak("Please choose an avatar!");
      return;
    }

    addProfile({
      name: name.trim(),
      avatar: selectedAvatar,
    });

    speak(`Welcome to EmoStory, ${name}! Your profile is ready. Let's start playing!`);
    navigate("/scenarios");
  };

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    speak(`You selected ${avatar}. Great choice!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/profiles")}
          aria-label="Go back to profile selection"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-4">✨</div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Create Your Profile
          </h1>
          <p className="text-xl text-muted-foreground">
            Tell us about yourself so we can start your adventure!
          </p>

          {/* TTS Status Indicator */}
          <div className="mt-4 flex justify-center">
            <div className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
              textToSpeech || talkOverVoice
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {textToSpeech || talkOverVoice ? '🔊' : '🔇'}
              <span>
                {textToSpeech || talkOverVoice
                  ? 'Voice guide active'
                  : 'Voice guide off'
                }
              </span>
            </div>
          </div>
        </div>

        <Card className="p-8 shadow-card animate-scale-in">
          {/* Name Input */}
          <div className="mb-8">
            <label className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              What's your name?
            </label>
            <Input
              type="text"
              placeholder="Type your name here..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-lg p-4 h-14 text-center"
              maxLength={20}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleCreateProfile();
                }
              }}
            />
            {name && (
              <p className="text-center mt-2 text-primary font-medium">
                Hi there, {name}! 👋
              </p>
            )}
          </div>

          {/* Avatar Selection */}
          <div className="mb-8">
            <label className="text-lg font-semibold text-foreground mb-4 block">
              Choose your avatar:
            </label>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {avatars.map((avatar, index) => (
                <button
                  key={avatar}
                  onClick={() => handleAvatarSelect(avatar)}
                  className={`
                    w-16 h-16 rounded-xl text-3xl flex items-center justify-center
                    transition-all duration-200 transform hover:scale-110
                    ${selectedAvatar === avatar
                      ? 'bg-gradient-primary shadow-glow ring-4 ring-primary/30'
                      : 'bg-muted hover:bg-secondary'
                    }
                  `}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  aria-label={`Select ${avatar} as your avatar`}
                >
                  {avatar}
                </button>
              ))}
            </div>
            {selectedAvatar && (
              <div className="text-center mt-4">
                <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-lg">
                  <span className="text-2xl">{selectedAvatar}</span>
                  <span className="font-medium">Perfect choice!</span>
                </div>
              </div>
            )}
          </div>

          {/* Create Button */}
          <div className="text-center">
            {/* TTS Debug Button */}
            <div className="mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  console.log('Testing TTS...');
                  speak("This is a test of the text to speech system");
                }}
                className="mr-2"
              >
                Test TTS 🔊
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  console.log('Testing Description TTS...');
                  speakDescription("This is a test of the description voice system");
                }}
              >
                Test Description 📢
              </Button>
            </div>

            <Button
              variant="child"
              size="child"
              onClick={handleCreateProfile}
              disabled={!name.trim() || !selectedAvatar}
              className="w-full  text-xs md:text-md"
            >
              {name && selectedAvatar ? (
                <>Let's Play, {name}! 🎉</>
              ) : (
                "Complete Your Profile"
              )}
            </Button>

            {(!name.trim() || !selectedAvatar) && (
              <p className="text-muted-foreground text-sm mt-2">
                {!name.trim() ? "Enter your name" : "Choose an avatar"} to continue
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateProfile;
