import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

/*const authCheck = () =>{
    const token = localStorage.getItem("token");
    console.log(token);// trying to figure out how to logout so just here for logging purposes
    if(token){
      setAuth(true);
    }else{
      setAuth(false);
    }
  }*/

export default function Navbar() {
  
  const [auth, setAuth] = useState<boolean>(false);
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuth(!!token); // converts to true/false
  }, [location]);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false); 
  };
  
  

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
      {auth ? <Link to="/login" style={linkStyle} onClick = {logout}>Logout</Link>:
      <>
      <Link to="/login" style={linkStyle}>Login</Link>
      <Link to="/register" style={linkStyle}>Register</Link>
      </>
      }
    </nav>
  );
}

  