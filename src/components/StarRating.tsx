import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  stars: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

export function StarRating({ 
  stars, 
  maxStars = 5, 
  size = 'md',
  animated = false,
  className 
}: StarRatingProps) {
  return (
    <div className={cn("flex gap-1", className)}>
      {[...Array(maxStars)].map((_, index) => {
        const isFilled = index < stars;
        return (
          <Star
            key={index}
            className={cn(
              sizeClasses[size],
              "transition-all duration-300",
              isFilled 
                ? "text-yellow-400 fill-yellow-400" 
                : "text-muted-foreground/30",
              animated && isFilled && "animate-pulse"
            )}
            style={animated ? { animationDelay: `${index * 150}ms` } : undefined}
          />
        );
      })}
    </div>
  );
}
