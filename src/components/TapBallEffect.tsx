import { useCallback, useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface Burst {
  id: number;
  x: number;
  y: number;
}

const TapBallEffect = () => {
  const [bursts, setBursts] = useState<Burst[]>([]);

  const addBurst = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random();
    setBursts((previous) => [...previous.slice(-5), { id, x, y }]);
    window.setTimeout(() => setBursts((previous) => previous.filter((burst) => burst.id !== id)), 680);
  }, []);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => addBurst(event.clientX, event.clientY);
    document.addEventListener('pointerdown', onPointerDown, { passive: true });
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [addBurst]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden="true">
      {bursts.map((burst) => (
        <span key={burst.id} className="tap-burst absolute" style={{ left: burst.x, top: burst.y }}>
          <span className="tap-burst-ring" />
          <span className="tap-burst-core"><Sparkles className="h-5 w-5" /></span>
          {Array.from({ length: 8 }, (_, index) => (
            <span key={index} className="tap-burst-fragment" style={{ ['--fragment-angle' as string]: `${index * 45}deg` }} />
          ))}
        </span>
      ))}
      <style>{`
        .tap-burst { transform: translate(-50%, -50%); }
        .tap-burst-ring { position: absolute; left: 50%; top: 50%; width: 14px; height: 14px; border: 1px solid rgba(103,232,249,.9); border-radius: 9999px; transform: translate(-50%,-50%); animation: tap-burst-ring .62s cubic-bezier(.16,1,.3,1) forwards; }
        .tap-burst-core { position: absolute; left: 50%; top: 50%; display: grid; place-items: center; color: #fde68a; filter: drop-shadow(0 0 8px rgba(34,211,238,.85)); animation: tap-burst-core .55s ease-out forwards; }
        .tap-burst-fragment { position: absolute; left: 50%; top: 50%; width: 4px; height: 9px; border-radius: 4px; background: linear-gradient(#fef3c7,#22d3ee); transform-origin: center; animation: tap-burst-fragment .55s cubic-bezier(.15,.8,.25,1) forwards; }
        @keyframes tap-burst-ring { 0% { width: 12px; height: 12px; opacity: .95; } 100% { width: 76px; height: 76px; opacity: 0; } }
        @keyframes tap-burst-core { 0% { transform: translate(-50%,-50%) scale(.35) rotate(-25deg); opacity: 0; } 30% { transform: translate(-50%,-50%) scale(1.2) rotate(8deg); opacity: 1; } 100% { transform: translate(-50%,-50%) scale(.4) rotate(35deg); opacity: 0; } }
        @keyframes tap-burst-fragment { 0% { transform: translate(-50%,-50%) rotate(var(--fragment-angle)) translateY(-6px) scale(.5); opacity: 0; } 22% { opacity: 1; } 100% { transform: translate(-50%,-50%) rotate(var(--fragment-angle)) translateY(-34px) scale(0); opacity: 0; } }
      `}</style>
    </div>
  );
};

export default TapBallEffect;
