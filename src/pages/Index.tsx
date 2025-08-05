import { useNavigate } from "react-router-dom";
import { SplashScreen } from "@/components/SplashScreen";

const Index = () => {
  const navigate = useNavigate();

  const handleSplashComplete = () => {
    navigate("/profiles");
  };

  return <SplashScreen onComplete={handleSplashComplete} />;
};

export default Index;
