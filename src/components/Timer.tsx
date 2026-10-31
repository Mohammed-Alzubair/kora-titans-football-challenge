interface TimerProps {
  timeLeft: number;
  maxTime: number;
  isWaiting?: boolean;
  waitingLabel?: string;
}

export function Timer({ timeLeft, maxTime, isWaiting = false, waitingLabel = 'Preparing…' }: TimerProps) {
  const percentage = (timeLeft / maxTime) * 100;
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="timer-bar">
        <div 
          className="timer-fill"
          style={{ 
            width: `${isWaiting ? 100 : percentage}%`,
            background: !isWaiting && percentage < 30 
              ? 'linear-gradient(90deg, hsl(0 72% 51%), hsl(0 72% 60%))' 
              : 'var(--gradient-gold)'
          }}
        />
      </div>
      <p className="text-center mt-2 text-xl font-bold text-primary" aria-live="polite">
        {isWaiting ? <span className="text-sm">{waitingLabel}</span> : timeLeft.toFixed(1)}
      </p>
    </div>
  );
}
