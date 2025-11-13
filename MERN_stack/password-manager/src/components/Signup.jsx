// src/components/Signup.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Signup({ onSignupSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e?.preventDefault();
    setLoading(true); setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      onSignupSuccess && onSignupSuccess();
    } catch (err) {
      setLoading(false);
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="auth-card">
      <h1>Create Account</h1>
      <p className="lead">Register to start saving passwords securely.</p>

      <form onSubmit={handleSignup}>
        <div className="input">
          <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="input">
          <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>

        {error && <div style={{color:"#ffb4b4", marginBottom:10}}>{error}</div>}

        <div style={{display:"flex", gap:8}}>
          <button className="btn" type="submit">{loading ? "Signing..." : "Sign Up"}</button>
          <button type="button" className="btn secondary" onClick={()=>window.dispatchEvent(new CustomEvent('show-login'))}>Back</button>
        </div>
      </form>

      <p className="small" style={{marginTop:12}}>
        Already have an account? <span className="link" onClick={()=>window.dispatchEvent(new CustomEvent('show-login'))}>Login</span>
      </p>
    </div>
  );
}
