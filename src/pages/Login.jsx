// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", { email, password });
      const body = res.data;
      login(body.token, { id: body.id, name: body.name, email: body.email });
      nav("/");
    } catch (err) {
      alert(err?.response?.data || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  );
}
