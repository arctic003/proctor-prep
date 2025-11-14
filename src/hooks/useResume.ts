import { useState } from 'react';
import { analyzeResume } from '@/services/openai';
import { updateUserResume } from '@/services/firebase-db';
import { toast } from 'sonner';

export const useResume = (userId: string) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const uploadAndAnalyze = async (file: File) => {
    try {
      setIsAnalyzing(true);

      // Extract text from file
      const resumeText = await extractTextFromFile(file);

      // Analyze with OpenAI
      const resumeAnalysis = await analyzeResume(resumeText);

      // Save to Firestore (no file storage needed)
      await updateUserResume(userId, {
        ...resumeAnalysis,
        fileName: file.name,
        uploadedAt: new Date().toISOString()
      });

      setAnalysis(resumeAnalysis);
      toast.success('Resume analyzed successfully!');
      return resumeAnalysis;
    } catch (error) {
      console.error('Failed to analyze resume:', error);
      toast.error('Failed to analyze resume');
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    isAnalyzing,
    analysis,
    uploadAndAnalyze
  };
};

// Helper function - in production, use proper PDF parsing
const extractTextFromFile = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      // This is a simplified version - in production use pdf.js or similar
      const text = e.target?.result as string;
      resolve(text || 'Sample resume content for demonstration');
    };
    reader.readAsText(file);
  });
};
