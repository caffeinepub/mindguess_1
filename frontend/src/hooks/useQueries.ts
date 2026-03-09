import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Session, Question, Character } from '../backend';

export function useStartGame() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sessionId: string): Promise<Session> => {
      if (!actor) throw new Error('Actor not initialized');
      return await actor.startGame(sessionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });
}

export function useGetNextQuestion(sessionId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Question | null>({
    queryKey: ['nextQuestion', sessionId],
    queryFn: async () => {
      if (!actor) return null;
      return await actor.getNextQuestion(sessionId);
    },
    enabled: !!actor && !isFetching && !!sessionId,
  });
}

export function useAnswerQuestion() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      sessionId,
      questionId,
      answer,
    }: {
      sessionId: string;
      questionId: string;
      answer: string;
    }): Promise<Session | null> => {
      if (!actor) throw new Error('Actor not initialized');
      return await actor.answerQuestion(sessionId, questionId, answer);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['session', variables.sessionId] });
      queryClient.invalidateQueries({ queryKey: ['nextQuestion', variables.sessionId] });
      queryClient.invalidateQueries({ queryKey: ['guess', variables.sessionId] });
    },
  });
}

export function useGuessCharacter(sessionId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Character | null>({
    queryKey: ['guess', sessionId],
    queryFn: async () => {
      if (!actor) return null;
      return await actor.guessCharacter(sessionId);
    },
    enabled: !!actor && !isFetching && !!sessionId,
  });
}

export function useAddCharacter() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (character: Character): Promise<void> => {
      if (!actor) throw new Error('Actor not initialized');
      return await actor.addCharacter(character);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['characters'] });
    },
  });
}
