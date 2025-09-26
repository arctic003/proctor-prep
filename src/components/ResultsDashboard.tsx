import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { 
  Trophy, 
  TrendingUp, 
  Brain, 
  Clock,
  Target,
  AlertCircle,
  CheckCircle,
  Download,
  Share2,
  Calendar
} from "lucide-react";

const ResultsDashboard = () => {
  // Mock data for charts
  const performanceData = [
    { category: 'Technical Skills', score: 85, benchmark: 75 },
    { category: 'Problem Solving', score: 78, benchmark: 70 },
    { category: 'Communication', score: 92, benchmark: 80 },
    { category: 'Code Quality', score: 88, benchmark: 75 },
    { category: 'Time Management', score: 76, benchmark: 70 },
  ];

  const progressData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 70 },
    { month: 'Mar', score: 75 },
    { month: 'Apr', score: 82 },
    { month: 'May', score: 85 },
  ];

  const skillsBreakdown = [
    { name: 'JavaScript', value: 90, color: '#3B82F6' },
    { name: 'React', value: 85, color: '#8B5CF6' },
    { name: 'Node.js', value: 78, color: '#10B981' },
    { name: 'Database', value: 72, color: '#F59E0B' },
  ];

  const confidenceData = [
    { subject: 'JavaScript', A: 90, B: 80, fullMark: 100 },
    { subject: 'React', A: 85, B: 75, fullMark: 100 },
    { subject: 'Node.js', A: 78, B: 70, fullMark: 100 },
    { subject: 'Database', A: 72, B: 65, fullMark: 100 },
    { subject: 'System Design', A: 68, B: 60, fullMark: 100 },
    { subject: 'Algorithms', A: 82, B: 75, fullMark: 100 },
  ];

  const overallScore = 83;
  const improvement = 12;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-start"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Interview Results
            </h1>
            <p className="text-muted-foreground mt-2">
              React Developer Position • Tech Corp • May 15, 2024
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share Results
            </Button>
            <Button variant="hero">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </motion.div>

        {/* Overall Score Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass hover-glow transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
              <Trophy className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{overallScore}%</div>
              <div className="flex items-center text-xs text-accent">
                <TrendingUp className="mr-1 h-3 w-3" />
                +{improvement}% from last interview
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass hover-glow transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confidence Level</CardTitle>
              <Brain className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">High</div>
              <p className="text-xs text-muted-foreground">Based on voice analysis</p>
            </CardContent>
          </Card>

          <Card className="glass hover-glow transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Efficiency</CardTitle>
              <Clock className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">92%</div>
              <p className="text-xs text-muted-foreground">Avg response time: 2.3min</p>
            </CardContent>
          </Card>

          <Card className="glass hover-glow transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ranking</CardTitle>
              <Target className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">Top 15%</div>
              <p className="text-xs text-muted-foreground">Among all candidates</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="performance" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="skills">Skills Breakdown</TabsTrigger>
              <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
              <TabsTrigger value="feedback">AI Feedback</TabsTrigger>
            </TabsList>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Performance by Category</CardTitle>
                    <CardDescription>Your scores vs industry benchmarks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="score" fill="hsl(var(--primary))" radius={4} />
                        <Bar dataKey="benchmark" fill="hsl(var(--muted-foreground))" radius={4} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Confidence Analysis</CardTitle>
                    <CardDescription>Voice sentiment and confidence metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={confidenceData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis />
                        <Radar
                          name="Your Score"
                          dataKey="A"
                          stroke="hsl(var(--primary))"
                          fill="hsl(var(--primary))"
                          fillOpacity={0.3}
                        />
                        <Radar
                          name="Average"
                          dataKey="B"
                          stroke="hsl(var(--muted-foreground))"
                          fill="hsl(var(--muted-foreground))"
                          fillOpacity={0.1}
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Skills Breakdown Tab */}
            <TabsContent value="skills" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Technical Skills Distribution</CardTitle>
                    <CardDescription>Breakdown of your technical competencies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={skillsBreakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {skillsBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Detailed Skills Assessment</CardTitle>
                    <CardDescription>Individual skill ratings and recommendations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {skillsBreakdown.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{skill.name}</span>
                          <Badge variant={skill.value >= 85 ? 'default' : skill.value >= 75 ? 'secondary' : 'outline'}>
                            {skill.value >= 85 ? 'Excellent' : skill.value >= 75 ? 'Good' : 'Needs Improvement'}
                          </Badge>
                        </div>
                        <Progress value={skill.value} className="h-2" />
                        <div className="text-sm text-muted-foreground">
                          Score: {skill.value}% - 
                          {skill.value >= 85 ? ' Outstanding performance' : 
                           skill.value >= 75 ? ' Solid understanding' : 
                           ' Room for improvement'}
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Progress Tracking Tab */}
            <TabsContent value="progress" className="space-y-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Performance Over Time</CardTitle>
                  <CardDescription>Your interview performance trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AI Feedback Tab */}
            <TabsContent value="feedback" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass border-accent">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-accent">
                      <CheckCircle className="h-5 w-5" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 rounded-lg bg-accent/10">
                      <h4 className="font-medium mb-1">Excellent Problem Solving</h4>
                      <p className="text-sm text-muted-foreground">
                        Demonstrated clear logical thinking and systematic approach to complex problems.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-accent/10">
                      <h4 className="font-medium mb-1">Strong Communication</h4>
                      <p className="text-sm text-muted-foreground">
                        Articulated solutions clearly with proper technical terminology.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-accent/10">
                      <h4 className="font-medium mb-1">Code Quality</h4>
                      <p className="text-sm text-muted-foreground">
                        Wrote clean, readable code with good naming conventions.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-warning">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-warning">
                      <AlertCircle className="h-5 w-5" />
                      Areas for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 rounded-lg bg-warning/10">
                      <h4 className="font-medium mb-1">Time Management</h4>
                      <p className="text-sm text-muted-foreground">
                        Consider practicing with time constraints to improve response speed.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-warning/10">
                      <h4 className="font-medium mb-1">Edge Case Handling</h4>
                      <p className="text-sm text-muted-foreground">
                        Focus on identifying and handling edge cases in your solutions.
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-warning/10">
                      <h4 className="font-medium mb-1">System Design</h4>
                      <p className="text-sm text-muted-foreground">
                        Strengthen understanding of scalability and system architecture principles.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Items */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Recommended Next Steps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="hero" className="justify-start h-auto p-4">
                      <div className="text-left">
                        <div className="font-medium">Practice System Design</div>
                        <div className="text-sm opacity-80">Focus on scalability concepts</div>
                      </div>
                    </Button>
                    <Button variant="premium" className="justify-start h-auto p-4">
                      <div className="text-left">
                        <div className="font-medium">Timed Coding Practice</div>
                        <div className="text-sm opacity-80">Improve response speed</div>
                      </div>
                    </Button>
                    <Button variant="success" className="justify-start h-auto p-4">
                      <div className="text-left">
                        <div className="font-medium">Mock Interview</div>
                        <div className="text-sm opacity-80">Schedule another session</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4">
                      <div className="text-left">
                        <div className="font-medium">Study Resources</div>
                        <div className="text-sm opacity-80">Access curated materials</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsDashboard;