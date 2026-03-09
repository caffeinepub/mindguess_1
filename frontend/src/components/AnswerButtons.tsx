import { Button } from '@/components/ui/button';
import { Check, X, HelpCircle, ThumbsUp, ThumbsDown } from 'lucide-react';

interface AnswerButtonsProps {
  onAnswer: (answer: string) => void;
  disabled?: boolean;
  answerType: string;
}

export function AnswerButtons({ onAnswer, disabled, answerType }: AnswerButtonsProps) {
  const answers = [
    { value: 'yes', label: 'Yes', icon: Check, color: 'from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500' },
    { value: 'probably', label: 'Probably', icon: ThumbsUp, color: 'from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500' },
    { value: 'dont-know', label: "Don't Know", icon: HelpCircle, color: 'from-gray-600 to-slate-600 hover:from-gray-500 hover:to-slate-500' },
    { value: 'probably-not', label: 'Probably Not', icon: ThumbsDown, color: 'from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500' },
    { value: 'no', label: 'No', icon: X, color: 'from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {answers.map((answer) => {
        const Icon = answer.icon;
        return (
          <Button
            key={answer.value}
            onClick={() => onAnswer(answer.value)}
            disabled={disabled}
            className={`h-auto py-6 px-4 flex flex-col items-center gap-2 bg-gradient-to-br ${answer.color} text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-white/20`}
          >
            <Icon className="w-8 h-8" />
            <span className="text-sm">{answer.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
