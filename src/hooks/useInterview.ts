import { useState, useCallback } from 'react';
import { generateQuestion, validateAnswer, generateFollowUp, analyzeSentiment } from '@/services/openai';
import { createInterviewSession, addQuestionToSession, completeInterviewSession } from '@/services/firebase-db';
import { toast } from 'sonner';

export const useInterview = (userId: string) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [questionHistory, setQuestionHistory] = useState<string[]>([]);
  const [scores, setScores] = useState<number[]>([]);

  const startInterview = useCallback(async (techStack: string, difficulty: string, userProfile?: any) => {
    try {
      setIsLoading(true);
      const id = await createInterviewSession(userId, techStack, difficulty);
      setSessionId(id);
      
      const question = await generateQuestion(techStack, difficulty, [], userProfile);
      setCurrentQuestion(question);
      setQuestionHistory([question.question]);
      
      toast.success('Interview started!');
      return id;
    } catch (error) {
      console.error('Failed to start interview:', error);
      toast.error('Failed to start interview');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const submitAnswer = useCallback(async (userAnswer: string, techStack: string, difficulty: string) => {
    if (!sessionId || !currentQuestion) return;

    try {
      setIsLoading(true);

      // Validate answer
      const evaluation = await validateAnswer(
        currentQuestion.question,
        userAnswer,
        currentQuestion.expectedAnswer
      );

      // Analyze sentiment
      const sentiment = await analyzeSentiment(userAnswer);

      // Save to Firebase
      await addQuestionToSession(sessionId, {
        question: currentQuestion.question,
        userAnswer,
        expectedAnswer: currentQuestion.expectedAnswer,
        score: evaluation.score,
        feedback: evaluation.feedback
      });

      setScores(prev => [...prev, evaluation.score]);

      // Generate follow-up if answer needs clarification
      if (!evaluation.isCorrect && evaluation.score < 70) {
        const followUp = await generateFollowUp(
          currentQuestion.question,
          userAnswer,
          evaluation
        );
        
        setCurrentQuestion({
          question: followUp.question,
          expectedAnswer: evaluation.improvements.join(', '),
          followUpQuestions: []
        });
        setQuestionHistory(prev => [...prev, followUp.question]);
      } else {
        // Generate next question
        const nextQuestion = await generateQuestion(techStack, difficulty, questionHistory);
        setCurrentQuestion(nextQuestion);
        setQuestionHistory(prev => [...prev, nextQuestion.question]);
      }

      return { evaluation, sentiment };
    } catch (error) {
      console.error('Failed to submit answer:', error);
      toast.error('Failed to process answer');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, currentQuestion, questionHistory]);

  const endInterview = useCallback(async () => {
    if (!sessionId) return;

    try {
      setIsLoading(true);
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      
      await completeInterviewSession(sessionId, avgScore, {
        totalQuestions: scores.length,
        averageScore: avgScore
      });

      toast.success('Interview completed!');
      return avgScore;
    } catch (error) {
      console.error('Failed to end interview:', error);
      toast.error('Failed to complete interview');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, scores]);

  return {
    sessionId,
    currentQuestion,
    isLoading,
    startInterview,
    submitAnswer,
    endInterview,
    questionHistory
  };
};
