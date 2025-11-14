# AI Mock Interview Platform - Backend Setup Guide

## Prerequisites
1. Firebase account
2. OpenAI API account

## Setup Instructions

### 1. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Create Firestore Database (start in production mode)
5. Enable Storage
6. Go to Project Settings > General and copy your Firebase config

### 2. Environment Variables
1. Copy `.env.example` to `.env`
2. Fill in your Firebase credentials:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
3. Add your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=sk-...
   ```

### 3. Firestore Database Structure
The app will automatically create these collections:

#### `users` collection:
```json
{
  "email": "string",
  "name": "string",
  "resumeAnalysis": {
    "experience": "string",
    "skills": ["string"],
    "education": "string",
    "projects": "number",
    "recommendations": ["string"],
    "fileUrl": "string",
    "fileName": "string",
    "uploadedAt": "timestamp"
  },
  "createdAt": "timestamp"
}
```

#### `interviews` collection:
```json
{
  "userId": "string",
  "techStack": "string",
  "difficulty": "string",
  "status": "in-progress | completed",
  "startedAt": "timestamp",
  "completedAt": "timestamp",
  "questions": [{
    "question": "string",
    "userAnswer": "string",
    "expectedAnswer": "string",
    "score": "number",
    "feedback": "string",
    "timestamp": "timestamp"
  }],
  "overallScore": "number",
  "sentimentAnalysis": {}
}
```

### 4. Firestore Security Rules
Add these rules in Firebase Console > Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /interviews/{interviewId} {
      allow read: if request.auth != null && 
        resource.data.userId == request.auth.uid;
      allow write: if request.auth != null && 
        request.resource.data.userId == request.auth.uid;
    }
  }
}
```

### 5. Storage Rules
Add these rules in Firebase Console > Storage > Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /resumes/{userId}/{fileName} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Features Implemented

### OpenAI Integration
- **Resume Analysis**: Extracts skills, experience, education from uploaded resumes
- **Question Generation**: Creates technical questions based on tech stack and difficulty
- **Answer Validation**: Evaluates user answers and provides feedback
- **Follow-up Questions**: Generates adaptive follow-up based on responses
- **Sentiment Analysis**: Analyzes confidence and tone in answers

### Speech Recognition
- Uses Web Speech API for voice-to-text
- Continuous recognition during interview
- Supports interim and final results

### Firebase Integration
- **Authentication**: Email/password auth
- **Firestore**: Stores user profiles, interview sessions, questions/answers
- **Storage**: Stores uploaded resume files

## Usage in Components

### Starting an Interview
```typescript
import { useInterview } from '@/hooks/useInterview';

const { startInterview, currentQuestion, submitAnswer } = useInterview(userId);

// Start interview
await startInterview('React', 'Medium', userProfile);

// Submit answer
await submitAnswer(userAnswer, 'React', 'Medium');
```

### Uploading Resume
```typescript
import { useResume } from '@/hooks/useResume';

const { uploadAndAnalyze, analysis } = useResume(userId);

// Upload and analyze
const result = await uploadAndAnalyze(file);
```

### Speech Recognition
```typescript
import { speechRecognitionService } from '@/services/speech';

// Start listening
speechRecognitionService.start((transcript) => {
  console.log('User said:', transcript);
});

// Stop listening
speechRecognitionService.stop();
```

## Notes
- Speech recognition requires HTTPS in production
- OpenAI API calls may take 1-3 seconds
- Resume analysis works best with PDF files containing text (not scanned images)
- All API keys should be kept secure and never committed to git
