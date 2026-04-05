
import type { GameHistoryItem } from "../types/history";

interface SaveGameRequest {
  result: string; //result: "Win" | "Loss";
  rounds: number;
  //time: string; no longer being computed on client side, server handles it in saveGame controller
}

const BASE_URL = "http://localhost:3000";

export async function saveGame(data: SaveGameRequest): Promise<void> {
  await fetch(`${BASE_URL}/game/saveGame`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
}

export async function getGameHistory(): Promise<GameHistoryItem[]> {
  const response = await fetch(`${BASE_URL}/user/history`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch game history");
  }

  const json : {status: string; history: GameHistoryItem[] } = await response.json()
  return json.history; //just returned the history directly
}