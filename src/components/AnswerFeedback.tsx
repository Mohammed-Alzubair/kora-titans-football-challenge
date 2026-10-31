import { CheckCircle2, Target, XCircle } from 'lucide-react';

interface AnswerFeedbackProps {
  isCorrect: boolean;
  title: string;
  detail: string;
  className?: string;
}

export function AnswerFeedback({ isCorrect, title, detail, className = '' }: AnswerFeedbackProps) {
  return (
    <div
      role="status"
      aria-live="assertive"
      className={`flex items-center gap-3 rounded-2xl border p-4 shadow-[0_18px_55px_rgba(0,0,0,0.4)] backdrop-blur-2xl animate-bounce-in ${
        isCorrect
          ? 'border-emerald-100/25 bg-emerald-950/90 text-emerald-50'
          : 'border-rose-100/25 bg-slate-950/95 text-rose-50'
      } ${className}`}
    >
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${isCorrect ? 'bg-emerald-300/15 text-emerald-200' : 'bg-rose-300/15 text-rose-200'}`}>
        {isCorrect ? <Target className="h-7 w-7" /> : <XCircle className="h-7 w-7" />}
      </span>
      <span className="min-w-0 text-start">
        <span className="flex items-center gap-1.5 text-base font-black leading-tight md:text-lg">
          {isCorrect && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-200" />}
          {title}
        </span>
        <span className="mt-1 block text-xs font-semibold leading-relaxed text-white/70 md:text-sm">{detail}</span>
      </span>
    </div>
  );
}
