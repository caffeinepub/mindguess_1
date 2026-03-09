import { Button } from '@/components/ui/button';
import { useStartGame } from '../hooks/useQueries';
import { Sparkles, Brain } from 'lucide-react';
import type { Session } from '../backend';

interface StartScreenProps {
  onStartGame: (session: Session) => void;
}

export function StartScreen({ onStartGame }: StartScreenProps) {
  const startGameMutation = useStartGame();

  const handleStart = () => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    startGameMutation.mutate(sessionId, {
      onSuccess: (session) => {
        onStartGame(session);
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto text-center">
      <div 
        className="relative rounded-3xl overflow-hidden shadow-2xl border border-purple-500/30"
        style={{
          backgroundImage: 'url(/assets/generated/crystal-ball-bg.dim_1200x600.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-indigo-900/70 to-violet-900/80 backdrop-blur-sm" />
        
        <div className="relative z-10 px-8 py-16 md:py-24">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Brain className="w-12 h-12 text-purple-300 animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200">
              MindGuess
            </h1>
            <Sparkles className="w-12 h-12 text-pink-300 animate-pulse" />
          </div>
          
          <p className="text-xl md:text-2xl text-purple-100 mb-4 font-light">
            Think of a character, and I will read your mind...
          </p>
          
          <p className="text-lg text-purple-200/80 mb-12 max-w-2xl mx-auto">
            Answer my questions with honesty, and watch as I unveil the character hidden in your thoughts.
            The more you play, the smarter I become.
          </p>
          
          <Button
            onClick={handleStart}
            disabled={startGameMutation.isPending}
            size="lg"
            className="px-12 py-6 text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {startGameMutation.isPending ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⚡</span>
                Preparing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                Begin the Journey
              </span>
            )}
          </Button>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
            <div className="bg-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <div className="text-3xl mb-2">🎭</div>
              <h3 className="text-lg font-semibold text-purple-200 mb-2">Think of Anyone</h3>
              <p className="text-sm text-purple-300/80">Real or fictional, famous or personal</p>
            </div>
            <div className="bg-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <div className="text-3xl mb-2">💭</div>
              <h3 className="text-lg font-semibold text-purple-200 mb-2">Answer Honestly</h3>
              <p className="text-sm text-purple-300/80">Your responses guide my intuition</p>
            </div>
            <div className="bg-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <div className="text-3xl mb-2">✨</div>
              <h3 className="text-lg font-semibold text-purple-200 mb-2">Watch the Magic</h3>
              <p className="text-sm text-purple-300/80">I'll reveal your character</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
