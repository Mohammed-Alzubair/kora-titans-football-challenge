import { useState, useEffect } from 'react';
import { Gavel } from 'lucide-react';

interface AuctionTransitionProps {
  onContinue: () => void;
  levelNum: number;
}

const messages = [
  "🏛️ المزاد يبدأ الآن!",
  "🔨 كم تقدر تراهن؟",
  "⏱️ 35 ثانية فقط...",
  "💪 أثبت إنك تعرف!",
  "🤑 المزايدة مفتوحة!",
  "🎯 ركّز وفكّر بسرعة!",
  "🏆 النقاط في انتظارك!",
  "🔥 التحدي الحقيقي هنا!",
  "⚡ سرعة + معرفة = فوز!",
  "🧠 وقت المزاد الكبير!",
];

export function AuctionTransition({ onContinue, levelNum }: AuctionTransitionProps) {
  const [show, setShow] = useState(false);
  const msg = messages[(levelNum - 76) % messages.length];

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-muted">
      <div className={`text-center transition-all duration-700 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
        <Gavel className="w-16 h-16 text-primary mx-auto mb-4 animate-bounce" />
        <h2 className="text-3xl font-black text-foreground mb-2">المرحلة {levelNum}</h2>
        <p className="text-xl text-primary font-bold mb-2">🏛️ المزاد</p>
        <p className="text-lg text-muted-foreground mb-6">{msg}</p>
        <p className="text-sm text-muted-foreground mb-4">5 جولات × 35 ثانية لكل جولة</p>
        <button
          onClick={onContinue}
          className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/80 transition-all animate-pulse"
        >
          ابدأ المزاد! 🔨
        </button>
      </div>
    </div>
  );
}
