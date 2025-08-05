import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProfiles } from "@/hooks/useProfiles";
import { ArrowLeft, BarChart3, TrendingUp, Clock, Star, Settings, User } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Mock data for demo
const emotionTrendData = [
  { date: '2024-01-01', happy: 75, neutral: 20, frustrated: 5 },
  { date: '2024-01-02', happy: 80, neutral: 15, frustrated: 5 },
  { date: '2024-01-03', happy: 70, neutral: 25, frustrated: 5 },
  { date: '2024-01-04', happy: 85, neutral: 10, frustrated: 5 },
  { date: '2024-01-05', happy: 90, neutral: 8, frustrated: 2 },
  { date: '2024-01-06', happy: 88, neutral: 10, frustrated: 2 },
  { date: '2024-01-07', happy: 92, neutral: 6, frustrated: 2 },
];

const scenarioData = [
  { name: 'Sharing Toy', goodChoices: 85, totalPlays: 12 },
  { name: 'Feeling Frustrated', goodChoices: 70, totalPlays: 8 },
  { name: 'Making Friends', goodChoices: 95, totalPlays: 15 },
  { name: 'Helping Others', goodChoices: 80, totalPlays: 10 },
];

const emotionDistribution = [
  { name: 'Happy', value: 65, color: '#22c55e' },
  { name: 'Excited', value: 20, color: '#f59e0b' },
  { name: 'Neutral', value: 12, color: '#6b7280' },
  { name: 'Frustrated', value: 3, color: '#ef4444' },
];

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { profiles } = useProfiles();
  const [selectedProfile, setSelectedProfile] = useState(profiles[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'overview' | 'scenarios' | 'emotions'>('overview');

  const currentProfile = profiles.find(p => p.id === selectedProfile);

  const handleBack = () => {
    navigate("/profiles");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

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

        <h1 className="text-2xl font-bold text-center">Parent Dashboard</h1>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleSettings}
          aria-label="Settings"
        >
          <Settings className="w-6 h-6" />
        </Button>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Child Selection */}
        <Card className="p-6 mb-6 shadow-card">
          <div className="flex items-center gap-4 mb-4">
            <User className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Select Child</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {profiles.map((profile) => (
              <Button
                key={profile.id}
                variant={selectedProfile === profile.id ? "default" : "outline"}
                onClick={() => setSelectedProfile(profile.id)}
                className="p-4 h-auto"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{profile.avatar}</div>
                  <div className="font-semibold">{profile.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {profile.scenariosCompleted} scenarios completed
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </Card>

        {currentProfile && (
          <>
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <Button
                variant={activeTab === 'overview' ? 'default' : 'outline'}
                onClick={() => setActiveTab('overview')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </Button>
              <Button
                variant={activeTab === 'scenarios' ? 'default' : 'outline'}
                onClick={() => setActiveTab('scenarios')}
              >
                <Star className="w-4 h-4 mr-2" />
                Scenarios
              </Button>
              <Button
                variant={activeTab === 'emotions' ? 'default' : 'outline'}
                onClick={() => setActiveTab('emotions')}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Emotions
              </Button>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="p-6 text-center shadow-card">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {currentProfile.scenariosCompleted}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Scenarios</div>
                  </Card>
                  
                  <Card className="p-6 text-center shadow-card">
                    <div className="text-3xl font-bold text-success mb-2">87%</div>
                    <div className="text-sm text-muted-foreground">Good Choices</div>
                  </Card>
                  
                  <Card className="p-6 text-center shadow-card">
                    <div className="text-3xl font-bold text-warning mb-2">78%</div>
                    <div className="text-sm text-muted-foreground">Positive Expressions</div>
                  </Card>
                  
                  <Card className="p-6 text-center shadow-card">
                    <div className="text-3xl font-bold text-accent mb-2">45m</div>
                    <div className="text-sm text-muted-foreground">Time This Week</div>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="p-6 shadow-card">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">The Toy Tug-of-War</div>
                        <div className="text-sm text-muted-foreground">Completed with 100% good choices</div>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">Feeling Frustrated</div>
                        <div className="text-sm text-muted-foreground">Practiced deep breathing technique</div>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: 2 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <Star className="w-4 h-4 text-gray-300" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Scenarios Tab */}
            {activeTab === 'scenarios' && (
              <Card className="p-6 shadow-card">
                <h3 className="text-lg font-semibold mb-4">Scenario Performance</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scenarioData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="goodChoices" fill="#22c55e" name="Good Choices %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 space-y-3">
                  {scenarioData.map((scenario) => (
                    <div key={scenario.name} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">{scenario.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {scenario.totalPlays} times played
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-success">{scenario.goodChoices}%</div>
                        <div className="text-sm text-muted-foreground">Good choices</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Emotions Tab */}
            {activeTab === 'emotions' && (
              <div className="space-y-6">
                {/* Emotion Trend */}
                <Card className="p-6 shadow-card">
                  <h3 className="text-lg font-semibold mb-4">Emotion Trends (Last 7 Days)</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={emotionTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="happy" stroke="#22c55e" strokeWidth={2} name="Happy" />
                        <Line type="monotone" dataKey="neutral" stroke="#6b7280" strokeWidth={2} name="Neutral" />
                        <Line type="monotone" dataKey="frustrated" stroke="#ef4444" strokeWidth={2} name="Frustrated" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                {/* Emotion Distribution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 shadow-card">
                    <h3 className="text-lg font-semibold mb-4">Overall Emotion Distribution</h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={emotionDistribution}
                            cx="50%"
                            cy="50%"
                            outerRadius={60}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {emotionDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>

                  <Card className="p-6 shadow-card">
                    <h3 className="text-lg font-semibold mb-4">Insights & Tips</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-success/10 text-success rounded-lg">
                        <div className="font-medium">✨ Great Progress!</div>
                        <div className="text-sm">
                          {currentProfile.name} shows positive expressions 78% of the time. Keep encouraging!
                        </div>
                      </div>
                      
                      <div className="p-3 bg-primary/10 text-primary rounded-lg">
                        <div className="font-medium">🎯 Suggestion</div>
                        <div className="text-sm">
                          Try more sharing scenarios to build on {currentProfile.name}'s strength in cooperation.
                        </div>
                      </div>
                      
                      <div className="p-3 bg-warning/10 text-warning rounded-lg">
                        <div className="font-medium">🤗 Tip</div>
                        <div className="text-sm">
                          Practice deep breathing together when frustrated feelings appear.
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </>
        )}

        {profiles.length === 0 && (
          <Card className="p-8 text-center shadow-card">
            <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
            <h2 className="text-2xl font-bold mb-4">No Child Profiles Yet</h2>
            <p className="text-muted-foreground mb-6">
              Create child profiles to start tracking their emotional learning progress.
            </p>
            <Button onClick={() => navigate("/create-profile")}>
              Create First Profile
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;