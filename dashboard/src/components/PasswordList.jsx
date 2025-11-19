import { useState } from "react";

function PasswordList({ passwords, deletePassword }) {

  // Track which passwords are visible
  const [visibleIds, setVisibleIds] = useState([]);

  // Toggle password visibility
  const toggleVisibility = (id) => {
    if (visibleIds.includes(id)) {
      setVisibleIds(visibleIds.filter((x) => x !== id));
    } else {
      setVisibleIds([...visibleIds, id]);
    }
  };

  return (
    <div className="password-list">
      <h2>Your Saved Passwords</h2>

      {passwords.length === 0 ? (
        <p>No passwords added yet.</p>
      ) : (
        passwords.map((item) => (
          <div key={item.id} className="password-item">
            <p><strong>App:</strong> {item.appName}</p>
            <p><strong>User:</strong> {item.username}</p>

            <p>
              <strong>Password:</strong>{" "}
              {visibleIds.includes(item.id)
                ? item.password
                : "••••••••"}

              <button
                className="eye-btn"
                onClick={() => toggleVisibility(item.id)}
              >
                {visibleIds.includes(item.id) ? "Hide" : "Show"}
              </button>
            </p>

            <button
              className="delete-btn"
              onClick={() => deletePassword(item.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default PasswordList;
