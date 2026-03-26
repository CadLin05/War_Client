import type { Card } from "../types/card";
import type { GameState } from "../types/game";
import { createDeck, shuffleDeck, splitDeck } from "./Deck.ts";

function drawTopCard(deck: Card[]): { drawnCard: Card | null; remainingDeck: Card[] } {
  if (deck.length === 0) {
    return {
      drawnCard: null,
      remainingDeck: [],
    };
  }

  const [drawnCard, ...remainingDeck] = deck;
  return {
    drawnCard,
    remainingDeck,
  };
}

export function startNewGame(): GameState {
  const newDeck = createDeck();
  const shuffledDeck = shuffleDeck(newDeck);
  const { playerDeck, computerDeck } = splitDeck(shuffledDeck);

  return {
    playerDeck,
    computerDeck,
    playerCard: null,
    computerCard: null,
    warPile: [],
    roundCount: 0,
    roundMessage: "Game started. Flip a card!",
    gameOver: false,
    winner: null,
  };
}

function resolveWar(
  playerDeck: Card[],
  computerDeck: Card[],
  warPile: Card[]
): {
  playerDeck: Card[];
  computerDeck: Card[];
  warPile: Card[];
  roundMessage: string;
  gameOver: boolean;
  winner: "Player" | "Computer" | null;
  playerCard: Card | null;
  computerCard: Card | null;
} {
  let updatedPlayerDeck = [...playerDeck];
  let updatedComputerDeck = [...computerDeck];
  let updatedWarPile = [...warPile];

  while (true) {
    if (updatedPlayerDeck.length < 2) {
      return {
        playerDeck: [],
        computerDeck: [...updatedComputerDeck, ...updatedWarPile, ...updatedPlayerDeck],
        warPile: updatedWarPile,
        roundMessage: "Player does not have enough cards for war. Computer wins the game!",
        gameOver: true,
        winner: "Computer",
        playerCard: null,
        computerCard: null,
      };
    }

    if (updatedComputerDeck.length < 2) {
      return {
        playerDeck: [...updatedPlayerDeck, ...updatedWarPile, ...updatedComputerDeck],
        computerDeck: [],
        warPile: updatedWarPile,
        roundMessage: "Computer does not have enough cards for war. Player wins the game!",
        gameOver: true,
        winner: "Player",
        playerCard: null,
        computerCard: null,
      };
    }

    const playerFaceDown = updatedPlayerDeck[0];
    const computerFaceDown = updatedComputerDeck[0];
    updatedPlayerDeck = updatedPlayerDeck.slice(1);
    updatedComputerDeck = updatedComputerDeck.slice(1);

    const playerFaceUp = updatedPlayerDeck[0];
    const computerFaceUp = updatedComputerDeck[0];
    updatedPlayerDeck = updatedPlayerDeck.slice(1);
    updatedComputerDeck = updatedComputerDeck.slice(1);

    updatedWarPile.push(playerFaceDown, computerFaceDown, playerFaceUp, computerFaceUp);

    if (playerFaceUp.value > computerFaceUp.value) {
      return {
        playerDeck: [...updatedPlayerDeck, ...updatedWarPile],
        computerDeck: updatedComputerDeck,
        warPile: [],
        roundMessage: `WAR! Player wins the war with ${playerFaceUp.rank} over ${computerFaceUp.rank}.`,
        gameOver: false,
        winner: null,
        playerCard: playerFaceUp,
        computerCard: computerFaceUp,
      };
    }

    if (computerFaceUp.value > playerFaceUp.value) {
      return {
        playerDeck: updatedPlayerDeck,
        computerDeck: [...updatedComputerDeck, ...updatedWarPile],
        warPile: [],
        roundMessage: `WAR! Computer wins the war with ${computerFaceUp.rank} over ${playerFaceUp.rank}.`,
        gameOver: false,
        winner: null,
        playerCard: playerFaceUp,
        computerCard: computerFaceUp,
      };
    }
  }
}

export function playRound(currentState: GameState): GameState {
  if (currentState.gameOver) {
    return currentState;
  }

  if (currentState.playerDeck.length === 0) {
    return {
      ...currentState,
      gameOver: true,
      winner: "Computer",
      roundMessage: "Computer wins the game!",
    };
  }

  if (currentState.computerDeck.length === 0) {
    return {
      ...currentState,
      gameOver: true,
      winner: "Player",
      roundMessage: "Player wins the game!",
    };
  }

  const playerDraw = drawTopCard(currentState.playerDeck);
  const computerDraw = drawTopCard(currentState.computerDeck);

  const playerCard = playerDraw.drawnCard;
  const computerCard = computerDraw.drawnCard;

  if (playerCard === null) {
    return {
      ...currentState,
      gameOver: true,
      winner: "Computer",
      roundMessage: "Computer wins the game!",
    };
  }

  if (computerCard === null) {
    return {
      ...currentState,
      gameOver: true,
      winner: "Player",
      roundMessage: "Player wins the game!",
    };
  }

  const updatedRoundCount = currentState.roundCount + 1;
  const roundPile: Card[] = [playerCard, computerCard];

  if (playerCard.value > computerCard.value) {
    const updatedPlayerDeck = [...playerDraw.remainingDeck, ...roundPile];

    return {
      ...currentState,
      playerDeck: updatedPlayerDeck,
      computerDeck: computerDraw.remainingDeck,
      playerCard,
      computerCard,
      warPile: [],
      roundCount: updatedRoundCount,
      roundMessage: `Player wins the round with ${playerCard.rank} over ${computerCard.rank}.`,
      gameOver: false,
      winner: null,
    };
  }

  if (computerCard.value > playerCard.value) {
    const updatedComputerDeck = [...computerDraw.remainingDeck, ...roundPile];

    return {
      ...currentState,
      playerDeck: playerDraw.remainingDeck,
      computerDeck: updatedComputerDeck,
      playerCard,
      computerCard,
      warPile: [],
      roundCount: updatedRoundCount,
      roundMessage: `Computer wins the round with ${computerCard.rank} over ${playerCard.rank}.`,
      gameOver: false,
      winner: null,
    };
  }

  const warResult = resolveWar(playerDraw.remainingDeck, computerDraw.remainingDeck, roundPile);

  return {
    ...currentState,
    playerDeck: warResult.playerDeck,
    computerDeck: warResult.computerDeck,
    playerCard: warResult.playerCard,
    computerCard: warResult.computerCard,
    warPile: warResult.warPile,
    roundCount: updatedRoundCount,
    roundMessage: warResult.roundMessage,
    gameOver: warResult.gameOver,
    winner: warResult.winner,
  };
}