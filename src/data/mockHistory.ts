import type { GameHistoryItem } from "../types/history";

export const mockHistory: GameHistoryItem[] = [
  {
    id: 1,
    result: "Win",
    rounds: 42,
    finishedAt: "2026-03-25T14:30:00",
  },
  {
    id: 2,
    result: "Loss",
    rounds: 31,
    finishedAt: "2026-03-24T18:15:00",
  },
  {
    id: 3,
    result: "Win",
    rounds: 55,
    finishedAt: "2026-03-23T20:05:00",
  },
  {
    id: 4,
    result: "Loss",
    rounds: 27,
    finishedAt: "2026-03-22T11:45:00",
  },
];