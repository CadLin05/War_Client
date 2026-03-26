import React, { useState } from "react";
import type { JSX } from "react";
import type { GameState } from "../types/game";
import { playRound, startNewGame } from "../utils/warLogic.ts";

export default function GamePage(): JSX.Element {
  const [gameState, setGameState] = useState<GameState>(startNewGame());

  function handleFlipCard(): void {
    setGameState((previousState) => playRound(previousState));
  }

  function handleNewGame(): void {
    setGameState(startNewGame());
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>War Card Game</h1>

      <div style={{ marginBottom: "1rem" }}>
        <p>
          <strong>Rounds Played:</strong> {gameState.roundCount}
        </p>
        <p>
          <strong>Player Deck Count:</strong> {gameState.playerDeck.length}
        </p>
        <p>
          <strong>Computer Deck Count:</strong> {gameState.computerDeck.length}
        </p>
      </div>

      <div style={{ display: "flex", gap: "3rem", marginBottom: "1.5rem" }}>
        <div>
          <h2>Player Card</h2>
          {gameState.playerCard ? (
            <p>
              {gameState.playerCard.rank} of {gameState.playerCard.suit}
            </p>
          ) : (
            <p>No card flipped yet</p>
          )}
        </div>

        <div>
          <h2>Computer Card</h2>
          {gameState.computerCard ? (
            <p>
              {gameState.computerCard.rank} of {gameState.computerCard.suit}
            </p>
          ) : (
            <p>No card flipped yet</p>
          )}
        </div>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <p>
          <strong>Round Result:</strong> {gameState.roundMessage}
        </p>
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={handleFlipCard} disabled={gameState.gameOver}>
          Flip Card
        </button>

        <button onClick={handleNewGame}>Start New Game</button>
      </div>

      {gameState.gameOver && gameState.winner && (
        <div style={{ marginTop: "1.5rem" }}>
          <h2>{gameState.winner} wins the game!</h2>
        </div>
      )}
    </div>
  );
}
