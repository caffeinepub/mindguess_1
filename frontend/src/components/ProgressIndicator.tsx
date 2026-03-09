import { Progress } from '@/components/ui/progress';
import { Users, MessageSquare } from 'lucide-react';

interface ProgressIndicatorProps {
  questionCount: number;
  remainingCandidates: number;
}

export function ProgressIndicator({ questionCount, remainingCandidates }: ProgressIndicatorProps) {
  const maxQuestions = 20;
  const progressPercentage = Math.min((questionCount / maxQuestions) * 100, 100);

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-purple-400" />
          <span className="text-lg font-semibold text-purple-200">
            Question {questionCount}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-pink-400" />
          <span className="text-lg font-semibold text-pink-200">
            {remainingCandidates} {remainingCandidates === 1 ? 'Candidate' : 'Candidates'}
          </span>
        </div>
      </div>
      <Progress value={progressPercentage} className="h-3 bg-purple-900/50" />
    </div>
  );
}
