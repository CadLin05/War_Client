import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to the War Card Game</h1>
      <p>
        Start a new game, track your past matches, and get ready to battle the computer.
      </p>

      <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
        <Link to="/game">
          <button>Play Game</button>
        </Link>

        <Link to="/history">
          <button>View Past Games</button>
        </Link>
      </div>
    </div>
  );
}