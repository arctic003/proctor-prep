import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Webcam from "react-webcam";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff, 
  Monitor,
  Clock,
  Brain,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Pause,
  Play,
  StopCircle
} from "lucide-react";

interface Question {
  id: number;
  text: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  timeLimit: number;
}

const InterviewInterface = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [interviewStatus, setInterviewStatus] = useState<'waiting' | 'active' | 'paused' | 'completed'>('waiting');
  const [userResponse, setUserResponse] = useState('');
  
  const questions: Question[] = [
    {
      id: 1,
      text: "What is the difference between let, const, and var in JavaScript?",
      difficulty: 'Easy',
      category: 'JavaScript',
      timeLimit: 300
    },
    {
      id: 2,
      text: "Explain the concept of closures in JavaScript with an example.",
      difficulty: 'Medium',
      category: 'JavaScript',
      timeLimit: 450
    },
    {
      id: 3,
      text: "How would you implement a debounce function from scratch?",
      difficulty: 'Hard',
      category: 'JavaScript',
      timeLimit: 600
    }
  ];

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (interviewStatus === 'active' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, interviewStatus]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startInterview = () => {
    setInterviewStatus('active');
    setIsRecording(true);
  };

  const pauseInterview = () => {
    setInterviewStatus('paused');
    setIsRecording(false);
  };

  const resumeInterview = () => {
    setInterviewStatus('active');
    setIsRecording(true);
  };

  const endInterview = () => {
    setInterviewStatus('completed');
    setIsRecording(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(questions[currentQuestion + 1].timeLimit);
      setUserResponse('');
    } else {
      endInterview();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Mock Interview Session
              </h1>
              <p className="text-muted-foreground">JavaScript Developer Position</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={interviewStatus === 'active' ? 'status-success' : 'status-warning'}>
                {interviewStatus === 'active' ? 'Recording' : interviewStatus === 'paused' ? 'Paused' : 'Standby'}
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Interview Progress</span>
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video & Controls */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-primary" />
                  Proctoring Panel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Webcam */}
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  {isCameraOn ? (
                    <Webcam
                      audio={false}
                      screenshotFormat="image/jpeg"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <CameraOff className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={isCameraOn ? "default" : "outline"}
                    onClick={() => setIsCameraOn(!isCameraOn)}
                    className="w-full"
                  >
                    {isCameraOn ? <Camera className="mr-2 h-4 w-4" /> : <CameraOff className="mr-2 h-4 w-4" />}
                    {isCameraOn ? 'Camera On' : 'Camera Off'}
                  </Button>
                  <Button
                    variant={isMicOn ? "default" : "outline"}
                    onClick={() => setIsMicOn(!isMicOn)}
                    className="w-full"
                  >
                    {isMicOn ? <Mic className="mr-2 h-4 w-4" /> : <MicOff className="mr-2 h-4 w-4" />}
                    {isMicOn ? 'Mic On' : 'Mic Off'}
                  </Button>
                </div>

                {/* Screen Share */}
                <Button variant="outline" className="w-full">
                  <Monitor className="mr-2 h-4 w-4" />
                  Share Screen
                </Button>

                {/* AI Sentiment Analysis */}
                <div className="p-4 rounded-lg bg-muted/20">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Brain className="h-4 w-4 text-accent" />
                    AI Analysis
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Confidence Level</span>
                      <span className="text-accent font-medium">High</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Eye Contact</span>
                      <span className="text-primary font-medium">Good</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Speech Clarity</span>
                      <span className="text-primary font-medium">Excellent</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Question Panel */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="glass h-fit">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-secondary" />
                    Current Question
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-warning" />
                    <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Question Details */}
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant={currentQ.difficulty === 'Easy' ? 'default' : currentQ.difficulty === 'Medium' ? 'secondary' : 'outline'}>
                        {currentQ.difficulty}
                      </Badge>
                      <Badge variant="outline">{currentQ.category}</Badge>
                    </div>

                    {/* Question Text */}
                    <div className="p-6 rounded-lg bg-muted/20 border border-primary/20">
                      <h3 className="text-xl font-medium mb-2">Question {currentQ.id}</h3>
                      <p className="text-lg leading-relaxed">{currentQ.text}</p>
                    </div>

                    {/* Response Area */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Your Response</h4>
                      <textarea
                        value={userResponse}
                        onChange={(e) => setUserResponse(e.target.value)}
                        placeholder="Type your answer here or speak your response..."
                        className="w-full h-32 p-4 rounded-lg bg-muted/20 border border-input resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        disabled={interviewStatus !== 'active'}
                      />
                      
                      {/* Voice Response Indicator */}
                      {isRecording && (
                        <motion.div
                          className="flex items-center gap-2 text-sm text-primary"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <Mic className="h-4 w-4" />
                          Listening for voice response...
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Interview Controls */}
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <div className="flex gap-2">
                    {interviewStatus === 'waiting' && (
                      <Button variant="hero" onClick={startInterview}>
                        <Play className="mr-2 h-4 w-4" />
                        Start Interview
                      </Button>
                    )}
                    {interviewStatus === 'active' && (
                      <Button variant="outline" onClick={pauseInterview}>
                        <Pause className="mr-2 h-4 w-4" />
                        Pause
                      </Button>
                    )}
                    {interviewStatus === 'paused' && (
                      <Button variant="hero" onClick={resumeInterview}>
                        <Play className="mr-2 h-4 w-4" />
                        Resume
                      </Button>
                    )}
                    <Button variant="destructive" onClick={endInterview}>
                      <StopCircle className="mr-2 h-4 w-4" />
                      End Interview
                    </Button>
                  </div>

                  <Button 
                    variant="success" 
                    onClick={handleNextQuestion}
                    disabled={interviewStatus !== 'active' || !userResponse.trim()}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Next Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Status Messages */}
        <AnimatePresence>
          {interviewStatus === 'completed' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <Card className="glass border-accent">
                <CardContent className="p-6">
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-accent mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Interview Completed!</h3>
                    <p className="text-muted-foreground mb-4">
                      Your responses have been recorded and analyzed. Results will be available shortly.
                    </p>
                    <Button variant="hero">View Results</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InterviewInterface;