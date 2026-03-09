import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Session {
    remainingCandidates: Array<Character>;
    sessionId: string;
    answersSoFar: Array<[string, string]>;
    currentQuestion?: string;
}
export interface Question {
    id: string;
    questionText: string;
    answerType: string;
}
export interface Character {
    answerPatterns: Array<[string, string]>;
    name: string;
    description: string;
    category: string;
}
export interface backendInterface {
    addCharacter(character: Character): Promise<void>;
    addQuestion(question: Question): Promise<void>;
    answerQuestion(sessionId: string, questionId: string, answer: string): Promise<Session | null>;
    getNextQuestion(sessionId: string): Promise<Question | null>;
    guessCharacter(sessionId: string): Promise<Character | null>;
    startGame(sessionId: string): Promise<Session>;
}
