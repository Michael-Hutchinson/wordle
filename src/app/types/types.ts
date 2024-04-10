export enum Feedback {
  Correct = 'correct',
  Incorrect = 'incorrect',
  Invalid = 'invalid',
}

export interface GuessState {
  guess: string;
  feedback: Feedback[];
}
