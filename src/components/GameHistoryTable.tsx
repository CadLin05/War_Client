import type { GameHistoryItem } from "../types/history";

interface GameHistoryTableProps {
  games: GameHistoryItem[];
}

export default function GameHistoryTable({ games }: GameHistoryTableProps) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h1>Past Games</h1>

      {games.length === 0 ? (
        <p>No past games found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "1rem",
          }}
        >
          <thead>
            <tr>
              <th style={headerCellStyle}>Game ID</th>
              <th style={headerCellStyle}>Result</th>
              <th style={headerCellStyle}>Rounds</th>
              <th style={headerCellStyle}>Finished At</th>
            </tr>
          </thead>

          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td style={bodyCellStyle}>{game.id}</td>
                <td style={bodyCellStyle}>{game.result}</td>
                <td style={bodyCellStyle}>{game.rounds}</td>
                <td style={bodyCellStyle}>
                  {new Date(game.finishedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const headerCellStyle = {
  border: "1px solid #ccc",
  padding: "0.75rem",
  textAlign: "left" as const,
  backgroundColor: "#f4f4f4",
};

const bodyCellStyle = {
  border: "1px solid #ccc",
  padding: "0.75rem",
  textAlign: "left" as const,
};