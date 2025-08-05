import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useAccessibility } from "@/hooks/useAccessibility";
import { useProfiles } from "@/hooks/useProfiles";
import { ArrowLeft, Volume2, Eye, Camera, Type, Trash2, HelpCircle, Shield } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const {
    textToSpeech,
    talkOverVoice,
    narrationSpeed,
    textSize,
    enableFacialRecognition,
    setTextToSpeech,
    setTalkOverVoice,
    setNarrationSpeed,
    setTextSize,
    setEnableFacialRecognition,
    speak
  } = useAccessibility();

  const { profiles, deleteProfile } = useProfiles();
  const [activeTab, setActiveTab] = useState<'accessibility' | 'profiles' | 'privacy'>('accessibility');
  const [facialSensitivity, setFacialSensitivity] = useState([75]);
  const [backgroundMusic, setBackgroundMusic] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);

  const handleDeleteProfile = (profileId: string, profileName: string) => {
    if (window.confirm(`Are you sure you want to delete ${profileName}'s profile? This action cannot be undone.`)) {
      deleteProfile(profileId);
      toast.success(`${profileName}'s profile has been deleted`);
      speak(`${profileName}'s profile has been deleted`);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const textSizeOptions = [
    { value: 'small', label: 'Small', class: 'text-sm' },
    { value: 'medium', label: 'Medium', class: 'text-base' },
    { value: 'large', label: 'Large', class: 'text-lg' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>

        <h1 className="text-2xl font-bold">Settings</h1>

        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <Button
            variant={activeTab === 'accessibility' ? 'default' : 'outline'}
            onClick={() => setActiveTab('accessibility')}
            className="whitespace-nowrap"
          >
            <Eye className="w-4 h-4 mr-2" />
            Accessibility
          </Button>
          <Button
            variant={activeTab === 'profiles' ? 'default' : 'outline'}
            onClick={() => setActiveTab('profiles')}
            className="whitespace-nowrap"
          >
            <Shield className="w-4 h-4 mr-2" />
            Profiles
          </Button>
          <Button
            variant={activeTab === 'privacy' ? 'default' : 'outline'}
            onClick={() => setActiveTab('privacy')}
            className="whitespace-nowrap"
          >
            <Camera className="w-4 h-4 mr-2" />
            Privacy
          </Button>
        </div>

        {/* Accessibility Tab */}
        {activeTab === 'accessibility' && (
          <div className="space-y-6">
            {/* Basic Accessibility */}
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Basic Accessibility
              </h3>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Text-to-Speech</Label>
                    <p className="text-sm text-muted-foreground">Read all text aloud</p>
                  </div>
                  <Switch
                    checked={textToSpeech}
                    onCheckedChange={(checked) => {
                      setTextToSpeech(checked);
                      speak(checked ? "Text to speech enabled" : "Text to speech disabled");
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Enhanced Narration</Label>
                    <p className="text-sm text-muted-foreground">Describe visuals and actions for blind users</p>
                  </div>
                  <Switch
                    checked={talkOverVoice}
                    onCheckedChange={(checked) => {
                      setTalkOverVoice(checked);
                      speak(checked ? "Enhanced narration enabled" : "Enhanced narration disabled");
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-medium">Narration Speed</Label>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">🐢 Slow</span>
                    <Slider
                      value={[narrationSpeed]}
                      onValueChange={(value) => setNarrationSpeed(value[0])}
                      max={2}
                      min={0.5}
                      step={0.1}
                      className="flex-1"
                    />
                    <span className="text-sm">Fast 🐰</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Current speed: {narrationSpeed.toFixed(1)}x</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-medium">Text Size</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {textSizeOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant={textSize === option.value ? 'default' : 'outline'}
                        onClick={() => setTextSize(option.value as any)}
                        className={option.class}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Audio Settings */}
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                Audio Settings
              </h3>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Background Music</Label>
                    <p className="text-sm text-muted-foreground">Play ambient music during scenarios</p>
                  </div>
                  <Switch
                    checked={backgroundMusic}
                    onCheckedChange={setBackgroundMusic}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Sound Effects</Label>
                    <p className="text-sm text-muted-foreground">Play interactive sound effects</p>
                  </div>
                  <Switch
                    checked={soundEffects}
                    onCheckedChange={setSoundEffects}
                  />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Profiles Tab */}
        {activeTab === 'profiles' && (
          <div className="space-y-6">
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Child Profiles</h3>

              {profiles.length > 0 ? (
                <div className="space-y-4">
                  {profiles.map((profile) => (
                    <div key={profile.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{profile.avatar}</div>
                        <div>
                          <div className="font-medium">{profile.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Created {profile.createdAt.toLocaleDateString()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {profile.scenariosCompleted} scenarios completed
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteProfile(profile.id, profile.name)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">👤</div>
                  <p className="text-muted-foreground mb-4">No child profiles created yet</p>
                  <Button onClick={() => navigate("/create-profile")}>
                    Create First Profile
                  </Button>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Facial Recognition Settings
              </h3>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Enable Facial Recognition</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow the app to detect facial expressions for feedback
                    </p>
                  </div>
                  <Switch
                    checked={enableFacialRecognition}
                    onCheckedChange={(checked) => {
                      setEnableFacialRecognition(checked);
                      speak(checked ? "Facial recognition enabled" : "Facial recognition disabled");
                    }}
                  />
                </div>

                {enableFacialRecognition && (
                  <div className="space-y-2">
                    <Label className="text-base font-medium">Recognition Sensitivity</Label>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">Less Sensitive</span>
                      <Slider
                        value={facialSensitivity}
                        onValueChange={setFacialSensitivity}
                        max={100}
                        min={25}
                        step={5}
                        className="flex-1"
                      />
                      <span className="text-sm">More Sensitive</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Current sensitivity: {facialSensitivity[0]}%
                    </p>
                  </div>
                )}

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Privacy Information
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Facial recognition is processed locally on your device</li>
                    <li>• No facial data is stored or transmitted</li>
                    <li>• Only basic emotion detection is performed</li>
                    <li>• You can disable this feature at any time</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Help & Support
              </h3>

              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  View User Guide
                </Button>

                <Button variant="outline" className="w-full justify-start">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">About EmoStory</h4>
                  <p className="text-sm text-muted-foreground">
                    Version 1.0.0 - A social-emotional learning app for children
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Test Accessibility */}
        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Test Settings</h3>
          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={() => speak("This is a test of the text-to-speech feature. Hello!")}
              className=" text-xs md:text-md w-full"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Test Text-to-Speech
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                const utterance = new SpeechSynthesisUtterance(
                  "Description: This is a test of the enhanced narration feature. The screen shows a settings panel with various accessibility options. There are toggle switches for different features and sliders for adjusting settings."
                );
                utterance.rate = narrationSpeed;
                speechSynthesis.speak(utterance);
              }}
              className="w-full  text-xs md:text-md"
            >
              <Eye className="w-4 h-4 mr-2" />
              Test Enhanced Narration
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
