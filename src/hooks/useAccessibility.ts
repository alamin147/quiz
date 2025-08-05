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
      textToSpeech: true,
      talkOverVoice: true,
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
        console.log('TTS Debug:', { textToSpeech, text, narrationSpeed });

        if (!textToSpeech) {
          console.log('TTS disabled in settings');
          return;
        }

        if (!('speechSynthesis' in window)) {
          console.log('speechSynthesis not supported');
          return;
        }

        try {
          // Cancel any existing speech
          speechSynthesis.cancel();

          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = narrationSpeed;
          utterance.pitch = 1.1;
          utterance.volume = 1;

          utterance.onstart = () => console.log('TTS started:', text);
          utterance.onend = () => console.log('TTS ended:', text);
          utterance.onerror = (event) => console.error('TTS error:', event);

          speechSynthesis.speak(utterance);
        } catch (error) {
          console.error('TTS speak error:', error);
        }
      },
      speakDescription: (text: string) => {
        const { talkOverVoice, narrationSpeed } = get();
        console.log('TTS Description Debug:', { talkOverVoice, text });

        if (!talkOverVoice) {
          console.log('TalkOverVoice disabled in settings');
          return;
        }

        if (!('speechSynthesis' in window)) {
          console.log('speechSynthesis not supported for descriptions');
          return;
        }

        try {
          const utterance = new SpeechSynthesisUtterance(`Description: ${text}`);
          utterance.rate = narrationSpeed;
          utterance.pitch = 1.0;
          utterance.volume = 0.8;

          utterance.onstart = () => console.log('TTS Description started:', text);
          utterance.onend = () => console.log('TTS Description ended:', text);
          utterance.onerror = (event) => console.error('TTS Description error:', event);

          speechSynthesis.speak(utterance);
        } catch (error) {
          console.error('TTS speakDescription error:', error);
        }
      },
    }),
    {
      name: 'emostory-accessibility',
    }
  )
);
