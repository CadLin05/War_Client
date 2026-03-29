//The ability to shuffle the deck
//The ability to reset the deck back to 52 cards
//The ability to draw a card from the deck
import { useEffect, useReducer } from "react";
import { type Card, type Suit, type Rank } from "../types/card";

interface Props {
  cards: Card[];
  setCards: (cards: Card[]) => void;
}

interface DeckState {
  cards: Card[];
}

type ActionTypes = "SHUFFLE" | "RESET" | "DRAW";

interface Action {
  type: ActionTypes;
}

const generateDeck = (): Card[] => {
  const deck: Card[] = [];
  const suits = ["hearts", "diamonds", "clubs", "spades"] as const;
  const ranks = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ] as const;

  for (let i = 0; i < 52; i++) {
    const suit = suits[Math.floor(i / 13)] as Suit;
    const rank = ranks[i % 13] as Rank;
    const temp: Card = { value: i, suit, rank };
    deck.push(temp);
  }

  return deck;
};

const shuffleDeck = (deck: Card[]) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[rand]] = [deck[rand], deck[i]];
  }
};

const Deck = (props: Props) => {
  const { cards, setCards } = props;

  const [deck, dispatch] = useReducer(reducer, { cards });

  useEffect(() => {
    setCards(deck.cards);
  }, [deck, setCards]);

  function reducer(state: DeckState, action: Action) {
    switch (action.type) {
      case "DRAW": {
        console.log(state.cards.shift());
        return {
          ...state,
          cards: state.cards,
        };
      }
      case "RESET": {
        //We need to generate a 52 card deck and shuffle
        const newDeck = generateDeck();
        return {
          ...state,
          cards: newDeck,
        };
      }
      case "SHUFFLE": {
        shuffleDeck(state.cards);
        return {
          ...state,
          cards: state.cards,
        };
      }
      default:
        return state;
    }
  }

  return (
    <div>
      <button onClick={() => dispatch({ type: "DRAW" })}>Draw Card</button>
      <button onClick={() => dispatch({ type: "SHUFFLE" })}>
        Shuffle Cards
      </button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset Cards</button>
    </div>
  );
};

export default Deck;
