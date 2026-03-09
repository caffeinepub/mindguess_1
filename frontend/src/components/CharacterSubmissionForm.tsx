import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAddCharacter } from '../hooks/useQueries';
import { Loader2, Send } from 'lucide-react';
import type { Session, Character } from '../backend';

interface CharacterSubmissionFormProps {
  session: Session;
  onSubmitted: () => void;
}

export function CharacterSubmissionForm({ session, onSubmitted }: CharacterSubmissionFormProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  
  const addCharacterMutation = useAddCharacter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !category.trim()) {
      return;
    }

    const character: Character = {
      name: name.trim(),
      category: category.trim(),
      description: description.trim(),
      answerPatterns: session.answersSoFar,
    };

    addCharacterMutation.mutate(character, {
      onSuccess: () => {
        onSubmitted();
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card/50 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 mb-4">
            Help Me Learn!
          </h2>
          <p className="text-lg text-purple-300">
            I couldn't guess your character. Please teach me so I can improve!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-lg text-purple-200">
              Character Name *
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Harry Potter"
              required
              className="bg-purple-900/30 border-purple-500/50 text-white placeholder:text-purple-400/50 focus:border-purple-400 text-lg py-6"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-lg text-purple-200">
              Category *
            </Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Fictional Character, Historical Figure, Celebrity"
              required
              className="bg-purple-900/30 border-purple-500/50 text-white placeholder:text-purple-400/50 focus:border-purple-400 text-lg py-6"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-lg text-purple-200">
              Description (Optional)
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any additional details about this character..."
              rows={4}
              className="bg-purple-900/30 border-purple-500/50 text-white placeholder:text-purple-400/50 focus:border-purple-400 text-lg resize-none"
            />
          </div>

          <div className="bg-purple-800/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
            <p className="text-sm text-purple-300">
              <strong>Note:</strong> Your answers from this game will be saved with this character to help me learn and improve my guessing abilities.
            </p>
          </div>

          <Button
            type="submit"
            disabled={addCharacterMutation.isPending || !name.trim() || !category.trim()}
            className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {addCharacterMutation.isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin" />
                Teaching Me...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-6 h-6" />
                Submit Character
              </span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
