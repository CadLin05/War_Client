import { useState } from "react";
import GameBoard from "../components/GameBoard";
import type { GameState } from "../types/game";
import { playRound, startNewGame } from "../utils/warLogic";

export default function GamePage(): JSX.Element {
  const [gameState, setGameState] = useState<GameState>(startNewGame());

  function handleFlipCard(): void {
    setGameState((previousState) => playRound(previousState));
  }

  function handleNewGame(): void {
    setGameState(startNewGame());
  }

  return (
    <GameBoard
      roundCount={gameState.roundCount}
      playerDeckCount={gameState.playerDeck.length}
      computerDeckCount={gameState.computerDeck.length}
      playerCard={gameState.playerCard}
      computerCard={gameState.computerCard}
      roundMessage={gameState.roundMessage}
      gameOver={gameState.gameOver}
      winner={gameState.winner}
      onFlipCard={handleFlipCard}
      onNewGame={handleNewGame}
    />
  );
}