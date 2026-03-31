export interface GameHistoryItem {
  id: number;
  result: "Win" | "Loss";
  rounds: number;
  finishedAt: string;
}
