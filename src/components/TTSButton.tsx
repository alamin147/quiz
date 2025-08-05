import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useAccessibility } from '@/hooks/useAccessibility';
import { cn } from '@/lib/utils';

interface TTSButtonProps {
  text: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'sm' | 'default' | 'lg';
  autoSpeak?: boolean;
  emphasis?: 'excited' | 'calm' | 'encouraging';
  children?: React.ReactNode;
  disabled?: boolean;
}

export const TTSButton: React.FC<TTSButtonProps> = ({
  text,
  className,
  variant = 'outline',
  size = 'default',
  autoSpeak = false,
  emphasis,
  children,
  disabled = false,
}) => {
  const { speak, speakWithEmphasis, isSpeaking, stop, isSupported } = useTextToSpeech();
  const { textToSpeech } = useAccessibility();

  React.useEffect(() => {
    if (autoSpeak && textToSpeech && text) {
      if (emphasis) {
        speakWithEmphasis(text, emphasis);
      } else {
        speak(text);
      }
    }
  }, [autoSpeak, text, textToSpeech, speak, speakWithEmphasis, emphasis]);

  const handleClick = () => {
    if (!isSupported || disabled) return;

    if (isSpeaking) {
      stop();
    } else {
      if (emphasis) {
        speakWithEmphasis(text, emphasis);
      } else {
        speak(text);
      }
    }
  };

  if (!isSupported || !textToSpeech) {
    return null;
  }

  const getIcon = () => {
    if (!textToSpeech) return <VolumeX className="h-4 w-4" />;
    if (isSpeaking) return <Pause className="h-4 w-4" />;
    return <Volume2 className="h-4 w-4" />;
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      disabled={disabled || !text}
      className={cn(
        'transition-all duration-200',
        isSpeaking && 'animate-pulse bg-blue-100 border-blue-300',
        className
      )}
      aria-label={isSpeaking ? 'Stop reading' : 'Read text aloud'}
    >
      {getIcon()}
      {children && <span className="ml-2">{children}</span>}
    </Button>
  );
};

// Component for automatic text reading
export const TTSText: React.FC<{
  children: React.ReactNode;
  text?: string;
  emphasis?: 'excited' | 'calm' | 'encouraging';
  className?: string;
}> = ({ children, text, emphasis, className }) => {
  const textContent = text || (typeof children === 'string' ? children : '');

  return (
    <div className={cn('group relative', className)}>
      {children}
      {textContent && (
        <TTSButton
          text={textContent}
          emphasis={emphasis}
          className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          size="sm"
          variant="ghost"
        />
      )}
    </div>
  );
};
