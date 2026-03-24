import { useState } from "react";
import "./App.css";
import Card from "./components/card";
import type { Card as CardType } from "./types/card";
import Deck from "./components/deck";

function App() {
  const [value, setValue] = useState<number>(-1);
  const [visible, setVisible] = useState<boolean>(true);
  const [cards, setCards] = useState<CardType[]>([]);

  return (
    <>
      <div>
        <label>
          Change useEffect:
          <input
            type={"number"}
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value))}
          ></input>
        </label>
        <Deck cards={cards} setCards={setCards} />
        <button onClick={() => setVisible(!visible)}>Toggle Card</button>
        {visible ? <Card value={value} /> : null}
      </div>
    </>
  );
}

export default App;
