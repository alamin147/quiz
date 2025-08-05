import { useState, useEffect } from 'react';

export type EmotionType = 'happy' | 'sad' | 'neutral' | 'frustrated' | 'excited';

interface FacialRecognitionState {
  isActive: boolean;
  currentEmotion: EmotionType | null;
  confidence: number;
  isProcessing: boolean;
}

// Simulated facial recognition for demo purposes
export const useFacialRecognition = () => {
  const [state, setState] = useState<FacialRecognitionState>({
    isActive: false,
    currentEmotion: null,
    confidence: 0,
    isProcessing: false,
  });

  const startRecognition = () => {
    setState(prev => ({ ...prev, isActive: true, isProcessing: true }));
    
    // Simulate facial recognition processing
    setTimeout(() => {
      const emotions: EmotionType[] = ['happy', 'neutral', 'sad', 'frustrated', 'excited'];
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      const confidence = Math.random() * 0.4 + 0.6; // 60-100% confidence
      
      setState(prev => ({
        ...prev,
        currentEmotion: randomEmotion,
        confidence,
        isProcessing: false,
      }));
    }, 1000);
  };

  const stopRecognition = () => {
    setState({
      isActive: false,
      currentEmotion: null,
      confidence: 0,
      isProcessing: false,
    });
  };

  const getEmotionFeedback = (emotion: EmotionType | null) => {
    switch (emotion) {
      case 'happy':
        return { message: "I see a smile! Great job!", type: 'positive' as const };
      case 'excited':
        return { message: "You look excited! Wonderful!", type: 'positive' as const };
      case 'sad':
        return { message: "You look sad. That's okay, feelings are important.", type: 'neutral' as const };
      case 'frustrated':
        return { message: "I can see you're feeling frustrated. Take a deep breath.", type: 'negative' as const };
      case 'neutral':
        return { message: "You're thinking carefully. How are you feeling?", type: 'neutral' as const };
      default:
        return { message: "I'm watching for your expression!", type: 'neutral' as const };
    }
  };

  return {
    ...state,
    startRecognition,
    stopRecognition,
    getEmotionFeedback,
  };
};