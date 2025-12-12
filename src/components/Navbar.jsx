// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/");
  };

  return (
    <nav className="nav">
      <div className="logo"><Link to="/">Foodie</Link></div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/favorites">My Favorites</Link>
        {user ? (
          <>
          
            <span className="username">{user.name || user.email}</span>
            <button onClick={handleLogout} className="btn">Logout</button>
          </>
        ) : (
          <>
          <Link to="/profile">Profile</Link>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
