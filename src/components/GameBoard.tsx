import type { Card } from "../types/card";
import CardDisplay from "./CardDisplay";
import RoundMessage from "./RoundMessage";
import StatsPanel from "./StatsPanel";

interface GameBoardProps {
  roundCount: number;
  playerDeckCount: number;
  computerDeckCount: number;
  playerCard: Card | null;
  computerCard: Card | null;
  roundMessage: string;
  gameOver: boolean;
  winner: "Player" | "Computer" | null;
  onFlipCard: () => void;
  onNewGame: () => void;
}

export default function GameBoard({
  roundCount,
  playerDeckCount,
  computerDeckCount,
  playerCard,
  computerCard,
  roundMessage,
  gameOver,
  winner,
  onFlipCard,
  onNewGame,
}: GameBoardProps): JSX.Element {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>War Card Game</h1>

      <StatsPanel
        roundCount={roundCount}
        playerDeckCount={playerDeckCount}
        computerDeckCount={computerDeckCount}
      />

      <div
        style={{
          display: "flex",
          gap: "2rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <CardDisplay title="Player Card" card={playerCard} />
        <CardDisplay title="Computer Card" card={computerCard} />
      </div>

      <RoundMessage message={roundMessage} />

      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={onFlipCard} disabled={gameOver}>
          Flip Card
        </button>

        <button onClick={onNewGame}>Start New Game</button>
      </div>

      {gameOver && winner && (
        <div style={{ marginTop: "1.5rem" }}>
          <h2>{winner} wins the game!</h2>
        </div>
      )}
    </div>
  );
}