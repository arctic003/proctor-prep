const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "";

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const callOpenAI = async (messages: Message[]): Promise<string> => {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 1000
    })
  });

  if (!response.ok) {
    throw new Error('Failed to call OpenAI API');
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

export const analyzeResume = async (resumeText: string) => {
  const prompt = `Analyze this resume and extract:
1. Years of experience
2. Key technical skills (list 5-8 most relevant)
3. Education level
4. Number of projects mentioned
5. Recommended interview focus areas (3-4 specific topics)

Resume:
${resumeText}

Respond in JSON format:
{
  "experience": "string",
  "skills": ["string"],
  "education": "string",
  "projects": number,
  "recommendations": ["string"]
}`;

  const response = await callOpenAI([
    { role: 'system', content: 'You are an expert resume analyzer. Always respond with valid JSON.' },
    { role: 'user', content: prompt }
  ]);

  return JSON.parse(response);
};

export const generateQuestion = async (
  techStack: string,
  difficulty: string,
  previousQuestions: string[] = [],
  userProfile?: any
) => {
  const prompt = `Generate a technical interview question for ${techStack} at ${difficulty} difficulty level.
${userProfile ? `Consider the candidate has skills in: ${userProfile.skills.join(', ')}` : ''}
${previousQuestions.length > 0 ? `Avoid similar questions to: ${previousQuestions.join(', ')}` : ''}

Respond in JSON format:
{
  "question": "string",
  "expectedAnswer": "string (key points)",
  "followUpQuestions": ["string", "string"]
}`;

  const response = await callOpenAI([
    { role: 'system', content: 'You are an expert technical interviewer.' },
    { role: 'user', content: prompt }
  ]);

  return JSON.parse(response);
};

export const validateAnswer = async (
  question: string,
  userAnswer: string,
  expectedAnswer: string
) => {
  const prompt = `Question: ${question}

Expected Answer Key Points: ${expectedAnswer}

User's Answer: ${userAnswer}

Evaluate the answer and provide:
1. Score (0-100)
2. Feedback (specific and constructive)
3. Was the answer correct? (true/false)
4. Suggested improvements

Respond in JSON format:
{
  "score": number,
  "feedback": "string",
  "isCorrect": boolean,
  "improvements": ["string"]
}`;

  const response = await callOpenAI([
    { role: 'system', content: 'You are a fair technical interviewer evaluating answers.' },
    { role: 'user', content: prompt }
  ]);

  return JSON.parse(response);
};

export const generateFollowUp = async (
  question: string,
  userAnswer: string,
  evaluation: any
) => {
  const prompt = `Based on this interview exchange:
Question: ${question}
User Answer: ${userAnswer}
Evaluation: ${JSON.stringify(evaluation)}

Generate a relevant follow-up question to probe deeper or clarify understanding.

Respond in JSON format:
{
  "question": "string",
  "purpose": "string (why this follow-up)"
}`;

  const response = await callOpenAI([
    { role: 'system', content: 'You are an expert technical interviewer.' },
    { role: 'user', content: prompt }
  ]);

  return JSON.parse(response);
};

export const analyzeSentiment = async (text: string) => {
  const prompt = `Analyze the sentiment and confidence level in this response:
"${text}"

Respond in JSON format:
{
  "confidence": number (0-100),
  "sentiment": "positive" | "neutral" | "negative",
  "indicators": ["string"]
}`;

  const response = await callOpenAI([
    { role: 'system', content: 'You are a sentiment analysis expert.' },
    { role: 'user', content: prompt }
  ]);

  return JSON.parse(response);
};
