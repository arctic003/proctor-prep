export class SpeechRecognitionService {
  private recognition: any;
  private isListening: boolean = false;
  private onResultCallback: ((transcript: string) => void) | null = null;

  constructor() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.error('Speech recognition not supported in this browser');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      
      if (this.onResultCallback) {
        this.onResultCallback(transcript);
      }
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
    };
  }

  start(onResult: (transcript: string) => void) {
    if (!this.recognition) {
      throw new Error('Speech recognition not supported');
    }

    this.onResultCallback = onResult;
    this.recognition.start();
    this.isListening = true;
  }

  stop() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  isActive() {
    return this.isListening;
  }
}

export const speechRecognitionService = new SpeechRecognitionService();
