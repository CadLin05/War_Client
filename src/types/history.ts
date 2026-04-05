export interface GameHistoryItem {
  id: number; 
  // not sending user_id
  result: string; // used to beresult: "Win" | "Loss";
  rounds: number;
  time: string;
}
