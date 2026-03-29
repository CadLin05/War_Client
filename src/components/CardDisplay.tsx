import type { Card } from "../types/card";

interface CardDisplayProps {
  title: string;
  card: Card | null;
}

export default function CardDisplay({
  title,
  card,
}: CardDisplayProps): JSX.Element {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        width: "200px",
        minHeight: "120px",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2>{title}</h2>

      {card ? (
        <p>
          {card.rank} of {card.suit}
        </p>
      ) : (
        <p>No card flipped yet</p>
      )}
    </div>
  );
}
