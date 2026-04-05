import { useEffect, useState } from "react";
import GameHistoryTable from "../components/GameHistoryTable";
import { getGameHistory } from "../services/gameApi";
import type { GameHistoryItem } from "../types/history";
// later, replace mockHistory with getGameHistory from your API

export default function HistoryPage() {
  const [games, setGames] = useState<GameHistoryItem[]>([]);

  useEffect(() => {
    async function fetchHistory(){
      const history = await getGameHistory();
      setGames(history); //changed data to history, look at gameApi, getGameHistory function
    }
    fetchHistory();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <GameHistoryTable games={games} />
    </div>
  );
}

