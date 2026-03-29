import { Link } from "react-router-dom";

export default function Navbar() {
  const navStyle = {
    display: "flex",
    gap: "1rem",
    padding: "1rem 2rem",
    backgroundColor: "#222",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold" as const,
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/game" style={linkStyle}>Game</Link>
      <Link to="/history" style={linkStyle}>History</Link>
      <Link to="/login" style={linkStyle}>Login</Link>
      <Link to="/register" style={linkStyle}>Register</Link>
    </nav>
  );
}