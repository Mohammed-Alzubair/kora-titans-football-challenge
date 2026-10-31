import { useEffect, useRef, useState } from 'react';
import { Club, getClubDisplayName } from '@/data/clubs';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n/I18nProvider';

interface LogoCardProps {
  club: Club;
  logoSrc?: string;
  onClick: () => void;
  disabled: boolean;
  state: 'idle' | 'correct' | 'wrong';
}

export function LogoCard({ club, logoSrc, onClick, disabled, state }: LogoCardProps) {
  const { locale } = useI18n();
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) setLoaded(true);
  }, [club.id, logoSrc]);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "logo-card w-full aspect-square flex items-center justify-center",
        state === 'correct' && 'correct',
        state === 'wrong' && 'wrong',
        disabled && 'pointer-events-none'
      )}
    >
      <img
        ref={imageRef}
        src={logoSrc ?? club.logo}
        alt={getClubDisplayName(club, locale)}
        loading="eager"
        fetchPriority="high"
        onLoad={() => setLoaded(true)}
        className={cn(
          "w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-lg transition-opacity duration-150",
          loaded ? "opacity-100" : "opacity-0"
        )}
        onError={(e) => {
          (e.target as HTMLImageElement).src = club.fallbackLogo ?? '/placeholder.svg';
          setLoaded(true);
        }}
      />
    </button>
  );
}
