import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AccessibilityState {
  textToSpeech: boolean;
  talkOverVoice: boolean;
  narrationSpeed: number;
  textSize: 'small' | 'medium' | 'large';
  enableFacialRecognition: boolean;
  setTextToSpeech: (enabled: boolean) => void;
  setTalkOverVoice: (enabled: boolean) => void;
  setNarrationSpeed: (speed: number) => void;
  setTextSize: (size: 'small' | 'medium' | 'large') => void;
  setEnableFacialRecognition: (enabled: boolean) => void;
  speak: (text: string) => void;
  speakDescription: (text: string) => void;
}

export const useAccessibility = create<AccessibilityState>()(
  persist(
    (set, get) => ({
      textToSpeech: false,
      talkOverVoice: false,
      narrationSpeed: 1,
      textSize: 'medium',
      enableFacialRecognition: true,
      setTextToSpeech: (enabled) => set({ textToSpeech: enabled }),
      setTalkOverVoice: (enabled) => set({ talkOverVoice: enabled }),
      setNarrationSpeed: (speed) => set({ narrationSpeed: speed }),
      setTextSize: (size) => set({ textSize: size }),
      setEnableFacialRecognition: (enabled) => set({ enableFacialRecognition: enabled }),
      speak: (text: string) => {
        const { textToSpeech, narrationSpeed } = get();
        if (textToSpeech && 'speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = narrationSpeed;
          speechSynthesis.speak(utterance);
        }
      },
      speakDescription: (text: string) => {
        const { talkOverVoice, narrationSpeed } = get();
        if (talkOverVoice && 'speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(`Description: ${text}`);
          utterance.rate = narrationSpeed;
          speechSynthesis.speak(utterance);
        }
      },
    }),
    {
      name: 'emostory-accessibility',
    }
  )
);