import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";
import { useAccessibility } from "@/hooks/useAccessibility";
import { useEffect } from "react";
import { toast } from "sonner";

const ParentLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { speak } = useAccessibility();

  useEffect(() => {
    speak("Parent and therapist login screen");
  }, [speak]);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      speak("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, accept any email/password
      if (email && password) {
        toast.success("Login successful!");
        speak("Login successful! Welcome to the parent dashboard.");
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials");
        speak("Invalid credentials. Please try again.");
      }
    }, 1500);
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

      <div className="max-w-md mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Parent & Therapist Login
          </h1>
          <p className="text-muted-foreground">
            Access your dashboard to view progress and manage settings
          </p>
        </div>

        <Card className="p-6 shadow-card animate-scale-in">
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-12"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-12 w-12"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12"
              disabled={isLoading || !email || !password}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="text-center">
              <Button variant="link" size="sm" disabled={isLoading}>
                Forgot Password?
              </Button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Demo Access:</h3>
            <p className="text-xs text-muted-foreground">
              For demonstration purposes, use any email and password to access the dashboard.
            </p>
          </div>
        </Card>

        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => navigate("/profiles")}
            disabled={isLoading}
          >
            Back to Child Selection
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParentLogin;