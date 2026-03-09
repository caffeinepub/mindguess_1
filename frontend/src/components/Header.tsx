import { Brain, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-purple-500/30 bg-purple-950/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-3">
          <Brain className="w-8 h-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
            MindGuess
          </h1>
          <Sparkles className="w-8 h-8 text-pink-400" />
        </div>
      </div>
    </header>
  );
}
