import type { Card, Rank, Suit } from "../types/card";
import type { GameState } from "../types/game";

const suits: Suit[] = ["Hearts", "Diamonds", "Clubs", "Spades"];
const ranks: Rank[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

const rankValues: Record<Rank, number> = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

function createDeck(): Card[] {
  const deck: Card[] = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({
        suit,
        rank,
        value: rankValues[rank],
      });
    }
  }

  return deck;
}

function shuffleDeck(deck: Card[]): Card[] {
  const shuffledDeck = [...deck];

  for (let i = shuffledDeck.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[randomIndex]] = [shuffledDeck[randomIndex], shuffledDeck[i]];
  }

  return shuffledDeck;
}

function splitDeck(deck: Card[]): { playerDeck: Card[]; computerDeck: Card[] } {
  const middle = deck.length / 2;

  return {
    playerDeck: deck.slice(0, middle),
    computerDeck: deck.slice(middle),
  };
}

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

function resolveWar(
  playerDeck: Card[],
  computerDeck: Card[],
  warPile: Card[]
): {
  playerDeck: Card[];
  computerDeck: Card[];
  playerCard: Card | null;
  computerCard: Card | null;
  roundMessage: string;
  gameOver: boolean;
  winner: "Player" | "Computer" | null;
} {
  let updatedPlayerDeck = [...playerDeck];
  let updatedComputerDeck = [...computerDeck];
  let updatedWarPile = [...warPile];

  while (true) {
    if (updatedPlayerDeck.length < 2) {
      return {
        playerDeck: [],
        computerDeck: [...updatedComputerDeck, ...updatedWarPile, ...updatedPlayerDeck],
        playerCard: null,
        computerCard: null,
        roundMessage: "Player does not have enough cards for war. Computer wins the game!",
        gameOver: true,
        winner: "Computer",
      };
    }

    if (updatedComputerDeck.length < 2) {
      return {
        playerDeck: [...updatedPlayerDeck, ...updatedWarPile, ...updatedComputerDeck],
        computerDeck: [],
        playerCard: null,
        computerCard: null,
        roundMessage: "Computer does not have enough cards for war. Player wins the game!",
        gameOver: true,
        winner: "Player",
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

    updatedWarPile = [
      ...updatedWarPile,
      playerFaceDown,
      computerFaceDown,
      playerFaceUp,
      computerFaceUp,
    ];

    if (playerFaceUp.value > computerFaceUp.value) {
      return {
        playerDeck: [...updatedPlayerDeck, ...updatedWarPile],
        computerDeck: updatedComputerDeck,
        playerCard: playerFaceUp,
        computerCard: computerFaceUp,
        roundMessage: `WAR! Player wins with ${playerFaceUp.rank} over ${computerFaceUp.rank}.`,
        gameOver: false,
        winner: null,
      };
    }

    if (computerFaceUp.value > playerFaceUp.value) {
      return {
        playerDeck: updatedPlayerDeck,
        computerDeck: [...updatedComputerDeck, ...updatedWarPile],
        playerCard: playerFaceUp,
        computerCard: computerFaceUp,
        roundMessage: `WAR! Computer wins with ${computerFaceUp.rank} over ${playerFaceUp.rank}.`,
        gameOver: false,
        winner: null,
      };
    }
  }
}

export function startNewGame(): GameState {
  const freshDeck = shuffleDeck(createDeck());
  const { playerDeck, computerDeck } = splitDeck(freshDeck);

  return {
    playerDeck,
    computerDeck,
    playerCard: null,
    computerCard: null,
    roundCount: 0,
    roundMessage: "Game started. Flip a card!",
    gameOver: false,
    winner: null,
  };
}

export function playRound(state: GameState): GameState {
  if (state.gameOver) {
    return state;
  }

  if (state.playerDeck.length === 0) {
    return {
      ...state,
      gameOver: true,
      winner: "Computer",
      roundMessage: "Computer wins the game!",
    };
  }

  if (state.computerDeck.length === 0) {
    return {
      ...state,
      gameOver: true,
      winner: "Player",
      roundMessage: "Player wins the game!",
    };
  }

  const playerDraw = drawTopCard(state.playerDeck);
  const computerDraw = drawTopCard(state.computerDeck);

  const playerCard = playerDraw.drawnCard;
  const computerCard = computerDraw.drawnCard;

  if (playerCard === null) {
    return {
      ...state,
      gameOver: true,
      winner: "Computer",
      roundMessage: "Computer wins the game!",
    };
  }

  if (computerCard === null) {
    return {
      ...state,
      gameOver: true,
      winner: "Player",
      roundMessage: "Player wins the game!",
    };
  }

  const roundPile: Card[] = [playerCard, computerCard];
  const updatedRoundCount = state.roundCount + 1;

  if (playerCard.value > computerCard.value) {
    return {
      ...state,
      playerDeck: [...playerDraw.remainingDeck, ...roundPile],
      computerDeck: computerDraw.remainingDeck,
      playerCard,
      computerCard,
      roundCount: updatedRoundCount,
      roundMessage: `Player wins the round with ${playerCard.rank} over ${computerCard.rank}.`,
      gameOver: false,
      winner: null,
    };
  }

  if (computerCard.value > playerCard.value) {
    return {
      ...state,
      playerDeck: playerDraw.remainingDeck,
      computerDeck: [...computerDraw.remainingDeck, ...roundPile],
      playerCard,
      computerCard,
      roundCount: updatedRoundCount,
      roundMessage: `Computer wins the round with ${computerCard.rank} over ${playerCard.rank}.`,
      gameOver: false,
      winner: null,
    };
  }

  const warResult = resolveWar(playerDraw.remainingDeck, computerDraw.remainingDeck, roundPile);

  return {
    ...state,
    playerDeck: warResult.playerDeck,
    computerDeck: warResult.computerDeck,
    playerCard: warResult.playerCard,
    computerCard: warResult.computerCard,
    roundCount: updatedRoundCount,
    roundMessage: warResult.roundMessage,
    gameOver: warResult.gameOver,
    winner: warResult.winner,
  };
}