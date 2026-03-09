import { useState, useEffect } from 'react';
import { CharacterAvatar } from './CharacterAvatar';
import { QuestionPanel } from './QuestionPanel';
import { AnswerButtons } from './AnswerButtons';
import { ProgressIndicator } from './ProgressIndicator';
import { useGetNextQuestion, useAnswerQuestion, useGuessCharacter } from '../hooks/useQueries';
import type { Session, Character, Question } from '../backend';
import { Loader2 } from 'lucide-react';

interface GameInterfaceProps {
  session: Session;
  onGuessReady: (character: Character) => void;
  onSessionUpdate: (session: Session) => void;
}

export function GameInterface({ session, onGuessReady, onSessionUpdate }: GameInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const getNextQuestionQuery = useGetNextQuestion(session.sessionId);
  const answerQuestionMutation = useAnswerQuestion();
  const guessCharacterQuery = useGuessCharacter(session.sessionId);

  useEffect(() => {
    if (getNextQuestionQuery.data) {
      setCurrentQuestion(getNextQuestionQuery.data);
    }
  }, [getNextQuestionQuery.data]);

  useEffect(() => {
    // Check if we should make a guess (1-3 candidates remaining or no more questions)
    if (session.remainingCandidates.length > 0 && session.remainingCandidates.length <= 3) {
      if (guessCharacterQuery.data) {
        onGuessReady(guessCharacterQuery.data);
      }
    } else if (!currentQuestion && session.remainingCandidates.length > 0) {
      // No more questions but still have candidates - guess the first one
      if (session.remainingCandidates[0]) {
        onGuessReady(session.remainingCandidates[0]);
      }
    }
  }, [session.remainingCandidates, currentQuestion, guessCharacterQuery.data, onGuessReady]);

  const handleAnswer = (answer: string) => {
    if (!currentQuestion || isProcessing) return;
    
    setIsProcessing(true);
    answerQuestionMutation.mutate(
      {
        sessionId: session.sessionId,
        questionId: currentQuestion.id,
        answer,
      },
      {
        onSuccess: (updatedSession) => {
          if (updatedSession) {
            onSessionUpdate(updatedSession);
            // Refetch next question
            getNextQuestionQuery.refetch();
          }
          setIsProcessing(false);
        },
        onError: () => {
          setIsProcessing(false);
        },
      }
    );
  };

  if (!currentQuestion && !isProcessing) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-card/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-12">
          <Loader2 className="w-16 h-16 mx-auto mb-4 text-purple-400 animate-spin" />
          <p className="text-xl text-purple-200">Preparing your experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ProgressIndicator 
        questionCount={session.answersSoFar.length}
        remainingCandidates={session.remainingCandidates.length}
      />
      
      <div className="mt-8 bg-card/50 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-8 shadow-2xl">
        <CharacterAvatar showName={false} />
        
        {currentQuestion && (
          <>
            <QuestionPanel question={currentQuestion.questionText} />
            <AnswerButtons 
              onAnswer={handleAnswer}
              disabled={isProcessing}
              answerType={currentQuestion.answerType}
            />
          </>
        )}
        
        {isProcessing && (
          <div className="mt-8 flex items-center justify-center gap-3 text-purple-300">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-lg">Reading your thoughts...</span>
          </div>
        )}
      </div>
    </div>
  );
}
