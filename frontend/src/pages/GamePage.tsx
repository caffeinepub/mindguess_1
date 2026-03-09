import { useState } from 'react';
import { StartScreen } from '../components/StartScreen';
import { GameInterface } from '../components/GameInterface';
import { GuessReveal } from '../components/GuessReveal';
import { CharacterSubmissionForm } from '../components/CharacterSubmissionForm';
import type { Session, Character } from '../backend';

type GameState = 'start' | 'questioning' | 'guessing' | 'learning' | 'success';

export function GamePage() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [session, setSession] = useState<Session | null>(null);
  const [guessedCharacter, setGuessedCharacter] = useState<Character | null>(null);

  const handleStartGame = (newSession: Session) => {
    setSession(newSession);
    setGameState('questioning');
  };

  const handleGuessReady = (character: Character) => {
    setGuessedCharacter(character);
    setGameState('guessing');
  };

  const handleCorrectGuess = () => {
    setGameState('success');
  };

  const handleIncorrectGuess = () => {
    setGameState('learning');
  };

  const handleCharacterSubmitted = () => {
    setGameState('success');
  };

  const handlePlayAgain = () => {
    setSession(null);
    setGuessedCharacter(null);
    setGameState('start');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {gameState === 'start' && <StartScreen onStartGame={handleStartGame} />}
      
      {gameState === 'questioning' && session && (
        <GameInterface 
          session={session} 
          onGuessReady={handleGuessReady}
          onSessionUpdate={setSession}
        />
      )}
      
      {gameState === 'guessing' && guessedCharacter && (
        <GuessReveal
          character={guessedCharacter}
          onCorrect={handleCorrectGuess}
          onIncorrect={handleIncorrectGuess}
        />
      )}
      
      {gameState === 'learning' && session && (
        <CharacterSubmissionForm
          session={session}
          onSubmitted={handleCharacterSubmitted}
        />
      )}
      
      {gameState === 'success' && (
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-card/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-12 shadow-2xl">
            <img 
              src="/assets/generated/sparkle-icon.dim_64x64.png" 
              alt="Success" 
              className="w-24 h-24 mx-auto mb-6 animate-pulse"
            />
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-4">
              Thank You for Playing!
            </h2>
            <p className="text-xl text-purple-200 mb-8">
              {guessedCharacter 
                ? "I successfully read your mind!" 
                : "Thanks for teaching me something new!"}
            </p>
            <button
              onClick={handlePlayAgain}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
