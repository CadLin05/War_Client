import React from "react";

interface RoundMessageProps {
  message: string;
}

export default function RoundMessage({
  message,
}: RoundMessageProps): React.JSX.Element {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1.5rem",
        backgroundColor: "#fff8e1",
      }}
    >
      <p>
        <strong>Round Result:</strong> {message}
      </p>
    </div>
  );
}
