import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  resumeAnalysis?: any;
  createdAt: Timestamp;
}

export interface InterviewSession {
  id?: string;
  userId: string;
  techStack: string;
  difficulty: string;
  status: 'in-progress' | 'completed';
  startedAt: Timestamp;
  completedAt?: Timestamp;
  questions: InterviewQuestion[];
  overallScore?: number;
  sentimentAnalysis?: any;
}

export interface InterviewQuestion {
  question: string;
  userAnswer: string;
  expectedAnswer: string;
  score: number;
  feedback: string;
  timestamp: Timestamp;
}

// User Profile Operations
export const createUserProfile = async (userId: string, email: string, name: string) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    email,
    name,
    createdAt: serverTimestamp()
  });
};

export const updateUserResume = async (userId: string, resumeAnalysis: any) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    resumeAnalysis,
    updatedAt: serverTimestamp()
  });
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return { id: userSnap.id, ...userSnap.data() } as UserProfile;
  }
  return null;
};

// Interview Session Operations
export const createInterviewSession = async (
  userId: string,
  techStack: string,
  difficulty: string
): Promise<string> => {
  const sessionRef = await addDoc(collection(db, 'interviews'), {
    userId,
    techStack,
    difficulty,
    status: 'in-progress',
    startedAt: serverTimestamp(),
    questions: []
  });
  return sessionRef.id;
};

export const addQuestionToSession = async (
  sessionId: string,
  questionData: Omit<InterviewQuestion, 'timestamp'>
) => {
  const sessionRef = doc(db, 'interviews', sessionId);
  const sessionSnap = await getDoc(sessionRef);
  
  if (sessionSnap.exists()) {
    const currentQuestions = sessionSnap.data().questions || [];
    await updateDoc(sessionRef, {
      questions: [
        ...currentQuestions,
        { ...questionData, timestamp: serverTimestamp() }
      ]
    });
  }
};

export const completeInterviewSession = async (
  sessionId: string,
  overallScore: number,
  sentimentAnalysis: any
) => {
  const sessionRef = doc(db, 'interviews', sessionId);
  await updateDoc(sessionRef, {
    status: 'completed',
    completedAt: serverTimestamp(),
    overallScore,
    sentimentAnalysis
  });
};

export const getUserInterviews = async (userId: string): Promise<InterviewSession[]> => {
  const q = query(
    collection(db, 'interviews'),
    where('userId', '==', userId),
    orderBy('startedAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as InterviewSession[];
};

export const getInterviewSession = async (sessionId: string): Promise<InterviewSession | null> => {
  const sessionRef = doc(db, 'interviews', sessionId);
  const sessionSnap = await getDoc(sessionRef);
  
  if (sessionSnap.exists()) {
    return { id: sessionSnap.id, ...sessionSnap.data() } as InterviewSession;
  }
  return null;
};
