// src/components/Login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e?.preventDefault();
    setError(""); setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      onLoginSuccess && onLoginSuccess();
    } catch (err) {
      setLoading(false);
      setError(err.message || "Login failed");
    }
  };

  const handleReset = async () => {
    if (!email) return setError("Enter email to reset password");
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent.");
    } catch (err) {
      setError(err.message || "Reset failed");
    }
  };

  return (
    <div className="auth-card">
      <h1>Welcome Back</h1>
      <p className="lead">Log in to access your secure vault.</p>

      <form onSubmit={handleLogin}>
        <div className="input">
          <input placeholder="Enter email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="input">
          <input placeholder="Enter password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>

        {error && <div style={{color:"#ffb4b4", marginBottom:10}}>{error}</div>}

        <div style={{display:"flex", gap:8, marginTop:6}}>
          <button type="submit" className="btn">{loading ? "Please wait..." : "Login"}</button>
          <button type="button" className="btn secondary" onClick={handleReset}>Reset</button>
        </div>
      </form>

      <p className="small" style={{marginTop:12}}>
        Don't have an account? <span className="link" onClick={()=>window.dispatchEvent(new CustomEvent('show-signup'))}>Sign Up</span>
      </p>
    </div>
  );
}
