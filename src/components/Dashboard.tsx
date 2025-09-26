import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  FileText, 
  BarChart3, 
  Settings, 
  Play,
  BookOpen,
  Code,
  Database,
  Layers,
  GitBranch,
  Server,
  Globe
} from "lucide-react";

const Dashboard = () => {
  const techStacks = [
    { name: "React/Next.js", icon: Code, difficulty: "Intermediate", questions: 120 },
    { name: "Node.js/Express", icon: Server, difficulty: "Advanced", questions: 95 },
    { name: "Python/Django", icon: Globe, difficulty: "Beginner", questions: 85 },
    { name: "Java/Spring", icon: Layers, difficulty: "Advanced", questions: 110 },
  ];

  const subjects = [
    { name: "Object Oriented Programming", icon: Code, progress: 75 },
    { name: "Database Management Systems", icon: Database, progress: 60 },
    { name: "Data Structures & Algorithms", icon: GitBranch, progress: 90 },
    { name: "System Design", icon: Layers, progress: 45 },
    { name: "Computer Networks", icon: Globe, progress: 55 },
    { name: "Operating Systems", icon: Settings, progress: 70 },
  ];

  const recentInterviews = [
    { company: "Tech Corp", position: "Frontend Developer", score: 85, status: "Completed" },
    { company: "StartupXYZ", position: "Full Stack Engineer", score: 78, status: "Completed" },
    { company: "DataFlow Inc", position: "React Developer", score: 92, status: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Interview Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Prepare for your next technical interview
            </p>
          </div>
          <Button variant="hero">
            <Play className="mr-2 h-4 w-4" />
            Quick Interview
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass hover-glow transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
              <Brain className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+4 from last week</p>
            </CardContent>
          </Card>
          
          <Card className="glass hover-glow transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">+12% improvement</p>
            </CardContent>
          </Card>

          <Card className="glass hover-glow transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subjects Mastered</CardTitle>
              <BookOpen className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3/6</div>
              <p className="text-xs text-muted-foreground">50% completion</p>
            </CardContent>
          </Card>

          <Card className="glass hover-glow transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confidence Level</CardTitle>
              <Settings className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">High</div>
              <p className="text-xs text-muted-foreground">Based on sentiment</p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tech Stack Interviews */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Tech Stack Interviews
                </CardTitle>
                <CardDescription>
                  Practice interviews based on your preferred technology stack
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {techStacks.map((stack, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-smooth">
                    <div className="flex items-center gap-3">
                      <stack.icon className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-medium">{stack.name}</h3>
                        <p className="text-sm text-muted-foreground">{stack.questions} questions available</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={stack.difficulty === 'Beginner' ? 'default' : stack.difficulty === 'Intermediate' ? 'secondary' : 'outline'}>
                        {stack.difficulty}
                      </Badge>
                      <Button size="sm" variant="ghost">Start</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Subject Practice */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-secondary" />
                  Subject Practice
                </CardTitle>
                <CardDescription>
                  Master fundamental computer science concepts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {subjects.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-smooth">
                    <div className="flex items-center gap-3">
                      <subject.icon className="h-6 w-6 text-accent" />
                      <div className="flex-1">
                        <h3 className="font-medium">{subject.name}</h3>
                        <div className="w-full bg-muted mt-1 rounded-full h-2">
                          <div 
                            className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${subject.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-primary">
                      {subject.progress}%
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Interviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-warning" />
                Recent Interview Results
              </CardTitle>
              <CardDescription>
                Your latest mock interview performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInterviews.map((interview, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-smooth">
                    <div>
                      <h3 className="font-medium">{interview.company}</h3>
                      <p className="text-sm text-muted-foreground">{interview.position}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium text-primary">{interview.score}%</div>
                        <Badge className="status-success">{interview.status}</Badge>
                      </div>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;