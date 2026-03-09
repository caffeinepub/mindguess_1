import { Button } from '@/components/ui/button';
import { CharacterAvatar } from './CharacterAvatar';
import { Sparkles, Check, X } from 'lucide-react';
import type { Character } from '../backend';

interface GuessRevealProps {
  character: Character;
  onCorrect: () => void;
  onIncorrect: () => void;
}

export function GuessReveal({ character, onCorrect, onIncorrect }: GuessRevealProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-card/50 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <img 
            src="/assets/generated/sparkle-icon.dim_64x64.png" 
            alt="Sparkle" 
            className="w-16 h-16 mx-auto mb-4 animate-bounce"
          />
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 mb-2">
            I Know Who You're Thinking Of!
          </h2>
          <p className="text-lg text-purple-300">Let me reveal your character...</p>
        </div>

        <CharacterAvatar character={{ name: character.name, category: character.category }} showName={true} />

        <div className="mt-8 space-y-4">
          <div className="bg-gradient-to-r from-purple-800/40 to-pink-800/40 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-purple-300" />
              <h3 className="text-xl font-semibold text-purple-200">Character Name</h3>
            </div>
            <p className="text-3xl font-bold text-white">{character.name}</p>
          </div>

          <div className="bg-gradient-to-r from-purple-800/40 to-pink-800/40 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-pink-300" />
              <h3 className="text-xl font-semibold text-pink-200">Category</h3>
            </div>
            <p className="text-2xl font-semibold text-white">{character.category}</p>
          </div>

          {character.description && (
            <div className="bg-gradient-to-r from-purple-800/40 to-pink-800/40 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-purple-300" />
                <h3 className="text-xl font-semibold text-purple-200">Description</h3>
              </div>
              <p className="text-lg text-purple-100">{character.description}</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xl text-purple-200 mb-6">Is this who you were thinking of?</p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={onCorrect}
              className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <Check className="w-6 h-6 mr-2" />
              Yes, That's Right!
            </Button>
            <Button
              onClick={onIncorrect}
              className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl shadow-lg hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <X className="w-6 h-6 mr-2" />
              No, That's Wrong
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
