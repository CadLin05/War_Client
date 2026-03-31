interface SaveGameRequest {
  result: "Win" | "Loss";
  rounds: number;
  finishedAt: string;
}

interface GameHistoryItem {
  id: number;
  result: "Win" | "Loss";
  rounds: number;
  finishedAt: string;
}

const BASE_URL = "http://localhost:3000";

export async function saveGame(data: SaveGameRequest): Promise<void> {
  await fetch(`${BASE_URL}/games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
}

export async function getGameHistory(): Promise<GameHistoryItem[]> {
  const response = await fetch(`${BASE_URL}/games`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch game history");
  }

  return response.json();
}