import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProfileSelection from "./pages/ProfileSelection";
import CreateProfile from "./pages/CreateProfile";
import ParentLogin from "./pages/ParentLogin";
import ScenarioSelection from "./pages/ScenarioSelection";
import ScenarioPlay from "./pages/ScenarioPlay";
import ParentDashboard from "./pages/ParentDashboard";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profiles" element={<ProfileSelection />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/parent-login" element={<ParentLogin />} />
          <Route path="/scenarios" element={<ScenarioSelection />} />
          <Route path="/scenario/:id" element={<ScenarioPlay />} />
          <Route path="/dashboard" element={<ParentDashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;