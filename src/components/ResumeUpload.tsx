import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  X,
  Download,
  Eye,
  Brain,
  Sparkles,
  Clock,
  Target
} from "lucide-react";

interface UploadedFile {
  file: File;
  status: 'uploading' | 'analyzing' | 'completed' | 'error';
  progress: number;
  analysis?: {
    experience: string;
    skills: string[];
    education: string;
    projects: number;
    recommendations: string[];
  };
}

const ResumeUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map(file => ({
      file,
      status: 'uploading',
      progress: 0
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload and analysis
    newFiles.forEach((fileData, index) => {
      simulateUpload(fileData, index);
    });
  }, []);

  const simulateUpload = (fileData: UploadedFile, index: number) => {
    const updateProgress = (progress: number, status: UploadedFile['status']) => {
      setUploadedFiles(prev => prev.map((f, i) => 
        f.file === fileData.file ? { ...f, progress, status } : f
      ));
    };

    // Simulate upload progress
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += 10;
      updateProgress(progress, 'uploading');
      
      if (progress >= 100) {
        clearInterval(uploadInterval);
        updateProgress(100, 'analyzing');
        
        // Simulate AI analysis
        setTimeout(() => {
          const mockAnalysis = {
            experience: "3-5 years",
            skills: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git"],
            education: "Bachelor's in Computer Science",
            projects: 4,
            recommendations: [
              "Focus on system design questions",
              "Prepare for behavioral questions about leadership",
              "Practice algorithms and data structures"
            ]
          };
          
          setUploadedFiles(prev => prev.map((f, i) => 
            f.file === fileData.file 
              ? { ...f, status: 'completed', analysis: mockAnalysis }
              : f
          ));
        }, 2000);
      }
    }, 200);
  };

  const removeFile = (fileToRemove: File) => {
    setUploadedFiles(prev => prev.filter(f => f.file !== fileToRemove));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    multiple: false
  });

  const completedAnalysis = uploadedFiles.find(f => f.status === 'completed')?.analysis;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Resume Analysis
          </h1>
          <p className="text-muted-foreground mt-2">
            Upload your resume to get AI-powered interview questions tailored to your experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Upload Resume
                </CardTitle>
                <CardDescription>
                  Supported formats: PDF, DOC, DOCX, TXT
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Dropzone */}
                <div
                  {...getRootProps()}
                  className={`
                    border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
                    ${isDragActive 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/50 hover:bg-primary/5'
                    }
                  `}
                >
                  <input {...getInputProps()} />
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-medium mb-2">
                    {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop your file here, or click to browse
                  </p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>

                {/* File List */}
                <AnimatePresence>
                  {uploadedFiles.map((fileData, index) => (
                    <motion.div
                      key={fileData.file.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-lg bg-muted/20 border"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-primary" />
                          <div>
                            <h4 className="font-medium">{fileData.file.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {(fileData.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {fileData.status === 'completed' && (
                            <CheckCircle className="h-5 w-5 text-accent" />
                          )}
                          {fileData.status === 'error' && (
                            <AlertCircle className="h-5 w-5 text-destructive" />
                          )}
                          {fileData.status === 'analyzing' && (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                              <Brain className="h-5 w-5 text-secondary" />
                            </motion.div>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(fileData.file)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {(fileData.status === 'uploading' || fileData.status === 'analyzing') && (
                        <div className="space-y-2">
                          <Progress value={fileData.progress} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {fileData.status === 'uploading' 
                              ? `Uploading... ${fileData.progress}%`
                              : 'Analyzing with AI...'
                            }
                          </p>
                        </div>
                      )}

                      {/* Success State */}
                      {fileData.status === 'completed' && (
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-3 w-3" />
                            Preview
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-3 w-3" />
                            Download
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Analysis Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {completedAnalysis ? (
              <Card className="glass border-accent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-accent">
                    <Sparkles className="h-5 w-5" />
                    AI Analysis Results
                  </CardTitle>
                  <CardDescription>
                    Personalized insights from your resume
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Experience Level */}
                  <div className="p-4 rounded-lg bg-accent/10">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Experience Level
                    </h4>
                    <Badge className="status-success">{completedAnalysis.experience}</Badge>
                  </div>

                  {/* Skills */}
                  <div className="p-4 rounded-lg bg-primary/10">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Identified Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {completedAnalysis.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div className="p-4 rounded-lg bg-secondary/10">
                    <h4 className="font-medium mb-2">Education</h4>
                    <p className="text-sm">{completedAnalysis.education}</p>
                  </div>

                  {/* Projects */}
                  <div className="p-4 rounded-lg bg-warning/10">
                    <h4 className="font-medium mb-2">Projects Found</h4>
                    <p className="text-2xl font-bold text-warning">{completedAnalysis.projects}</p>
                  </div>

                  {/* Recommendations */}
                  <div className="p-4 rounded-lg bg-muted/20">
                    <h4 className="font-medium mb-3">Interview Focus Areas</h4>
                    <ul className="space-y-2">
                      {completedAnalysis.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                    <Button variant="hero" className="w-full">
                      Start Interview
                    </Button>
                    <Button variant="outline" className="w-full">
                      Adjust Questions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="glass">
                <CardContent className="p-8 text-center">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-medium mb-2">No Resume Uploaded</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload your resume to see AI-powered analysis and get personalized interview questions
                  </p>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p>✓ Extract skills and experience level</p>
                    <p>✓ Generate relevant questions</p>
                    <p>✓ Customize difficulty based on background</p>
                    <p>✓ Focus on your specific tech stack</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>

        {/* Quick Actions */}
        {completedAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Ready to start your personalized interview experience?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="hero" className="h-20 flex-col">
                    <Brain className="h-6 w-6 mb-2" />
                    <div className="text-center">
                      <div className="font-medium">Start AI Interview</div>
                      <div className="text-xs opacity-80">Based on your resume</div>
                    </div>
                  </Button>
                  
                  <Button variant="premium" className="h-20 flex-col">
                    <Target className="h-6 w-6 mb-2" />
                    <div className="text-center">
                      <div className="font-medium">Practice Specific Skills</div>
                      <div className="text-xs opacity-80">Focus on weak areas</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-20 flex-col">
                    <Clock className="h-6 w-6 mb-2" />
                    <div className="text-center">
                      <div className="font-medium">Timed Challenge</div>
                      <div className="text-xs opacity-80">Simulate real interview</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;