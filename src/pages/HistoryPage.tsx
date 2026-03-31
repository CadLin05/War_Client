import { useEffect, useState } from "react";
import GameHistoryTable from "../components/GameHistoryTable";
import { mockHistory } from "../data/mockHistory";
// later, replace mockHistory with getGameHistory from your API

export default function HistoryPage() {
  const [games, setGames] = useState(mockHistory);

  useEffect(() => {
    setGames(mockHistory);
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <GameHistoryTable games={games} />
    </div>
  );
}
