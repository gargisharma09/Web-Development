import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PasswordVault from "./components/PasswordVault";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { motion } from "framer-motion";
import "./styles.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <motion.div
      className="app-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {!user ? (
        showSignup ? (
          <Signup onSwitch={() => setShowSignup(false)} />
        ) : (
          <Login onSwitch={() => setShowSignup(true)} />
        )
      ) : (
        <PasswordVault user={user} onLogout={handleLogout} />
      )}
    </motion.div>
  );
}
