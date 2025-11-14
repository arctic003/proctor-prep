import { useState } from 'react';
import { analyzeResume } from '@/services/openai';
import { updateUserResume } from '@/services/firebase-db';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { toast } from 'sonner';

export const useResume = (userId: string) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const uploadAndAnalyze = async (file: File) => {
    try {
      setIsAnalyzing(true);

      // Upload to Firebase Storage
      const storageRef = ref(storage, `resumes/${userId}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Extract text (for demo, we'll use file name and simulate)
      // In production, use a PDF parser library or backend service
      const resumeText = await extractTextFromFile(file);

      // Analyze with OpenAI
      const resumeAnalysis = await analyzeResume(resumeText);

      // Save to Firebase
      await updateUserResume(userId, {
        ...resumeAnalysis,
        fileUrl: downloadURL,
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
