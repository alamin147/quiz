import { useState, useCallback, useRef } from 'react';
import { useAccessibility } from './useAccessibility';

interface Voice {
  name: string;
  lang: string;
  gender?: 'male' | 'female';
}

interface UseTTSOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice | null;
}

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(typeof window !== 'undefined' && 'speechSynthesis' in window);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const { textToSpeech, narrationSpeed } = useAccessibility();
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load available voices
  const loadVoices = useCallback(() => {
    if (!isSupported) return;

    const availableVoices = speechSynthesis.getVoices();
    setVoices(availableVoices);
  }, [isSupported]);

  // Initialize voices when they become available
  useState(() => {
    if (isSupported) {
      loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  });

  // Get child-friendly voices
  const getChildFriendlyVoice = useCallback(() => {
    if (!voices.length) return null;

    // Prefer female voices for children's apps
    const femaleVoices = voices.filter(voice =>
      voice.name.toLowerCase().includes('female') ||
      voice.name.toLowerCase().includes('woman') ||
      voice.name.toLowerCase().includes('zira') ||
      voice.name.toLowerCase().includes('samantha')
    );

    if (femaleVoices.length > 0) {
      return femaleVoices[0];
    }

    // Fallback to any English voice
    const englishVoices = voices.filter(voice => voice.lang.startsWith('en'));
    return englishVoices.length > 0 ? englishVoices[0] : voices[0];
  }, [voices]);

  const speak = useCallback((text: string, options: UseTTSOptions = {}) => {
    if (!isSupported || !textToSpeech || !text.trim()) return;

    // Stop any current speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Set voice options
    utterance.rate = options.rate || narrationSpeed || 0.9;
    utterance.pitch = options.pitch || 1.1; // Slightly higher pitch for child-friendly sound
    utterance.volume = options.volume || 1;

    const childVoice = getChildFriendlyVoice();
    if (childVoice) {
      utterance.voice = childVoice;
    }

    // Event handlers
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  }, [isSupported, textToSpeech, narrationSpeed, getChildFriendlyVoice]);

  const speakWithEmphasis = useCallback((text: string, emphasis: 'excited' | 'calm' | 'encouraging' = 'encouraging') => {
    const emphasisOptions: Record<string, UseTTSOptions> = {
      excited: { rate: 1.1, pitch: 1.3 },
      calm: { rate: 0.8, pitch: 0.9 },
      encouraging: { rate: 0.95, pitch: 1.15 }
    };

    speak(text, emphasisOptions[emphasis]);
  }, [speak]);

  const speakInstruction = useCallback((text: string) => {
    const instructionText = `Instruction: ${text}`;
    speak(instructionText, { rate: 0.85, pitch: 1.0 });
  }, [speak]);

  const speakEncouragement = useCallback((text: string) => {
    speakWithEmphasis(`Great job! ${text}`, 'excited');
  }, [speakWithEmphasis]);

  const stop = useCallback(() => {
    if (isSupported) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  const pause = useCallback(() => {
    if (isSupported && isSpeaking) {
      speechSynthesis.pause();
    }
  }, [isSupported, isSpeaking]);

  const resume = useCallback(() => {
    if (isSupported) {
      speechSynthesis.resume();
    }
  }, [isSupported]);

  return {
    speak,
    speakWithEmphasis,
    speakInstruction,
    speakEncouragement,
    stop,
    pause,
    resume,
    isSpeaking,
    isSupported,
    voices,
    getChildFriendlyVoice
  };
};
