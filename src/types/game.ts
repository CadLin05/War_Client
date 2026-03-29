import type { Card } from "./card";

export interface GameState {
  playerDeck: Card[];
  computerDeck: Card[];
  playerCard: Card | null;
  computerCard: Card | null;
  roundCount: number;
  roundMessage: string;
  gameOver: boolean;
  winner: "Player" | "Computer" | null;
}