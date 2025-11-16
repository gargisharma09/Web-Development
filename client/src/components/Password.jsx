import { useState } from "react";

export default function PasswordForm({ onAdd }) {
  const [site, setSite] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // stop page reload
    if (!site.trim() || !password.trim()) return;
    onAdd({ site, password });
    setSite("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Site (example.com)"
        value={site}
        onChange={(e) => setSite(e.target.value)}
      />
      <input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
