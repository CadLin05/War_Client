import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  
  function logout(){
    localStorage.removeItem("token");//removes JWT token, will be used as a conditional for logging in or out.
    // need to have some kind of functionality to bring the login/register back up after logging out DONT FORGET
  }

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
      {token ? (<button onClick={logout}><h2>logout</h2></button>) : (
        <>
      <Link to="/login" style={linkStyle}>Login</Link>
      <Link to="/register" style={linkStyle}>Register</Link>
        </>
      )}
    </nav>
  );
}
  