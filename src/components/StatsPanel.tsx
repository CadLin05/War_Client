import React from "react";

interface StatsPanelProps {
  roundCount: number;
  playerDeckCount: number;
  computerDeckCount: number;
}

export default function StatsPanel({
  roundCount,
  playerDeckCount,
  computerDeckCount,
}: StatsPanelProps): React.JSX.Element {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1.5rem",
        backgroundColor: "#f4f4f4",
      }}
    >
      <p>
        <strong>Rounds Played:</strong> {roundCount}
      </p>
      <p>
        <strong>Player Deck Count:</strong> {playerDeckCount}
      </p>
      <p>
        <strong>Computer Deck Count:</strong> {computerDeckCount}
      </p>
    </div>
  );
}
