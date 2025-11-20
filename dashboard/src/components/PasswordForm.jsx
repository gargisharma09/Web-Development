import { useState } from "react";

function PasswordForm({ addPassword }) {
  
  const [appName, setAppName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  
  const handleAddPassword = () => {
    if (!appName || !username || !password) {
      alert("All fields are required!");
      return;
    }

   
    addPassword({
      id: Date.now(),
      appName,
      username,
      password,
    });
    setAppName("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="password-form">
      <h2>Add New Password</h2>

      <input
        type="text"
        placeholder="Website / App Name"
        value={appName}
        onChange={(e) => setAppName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Username / Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleAddPassword}>Add Password</button>
    </div>
  );
}

export default PasswordForm;
