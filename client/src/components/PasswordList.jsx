/*export default function PasswordList({ passwords }) {
  return (
    <div>
      <h3>Saved passwords</h3>
      <ul>
        {passwords.map((p) => (
          <li key={p.id}>
            <strong>{p.site}</strong> — {p.password}
          </li>
        ))}
      </ul>
    </div>
  );
}*/
//delete & copy functionality
export default function PasswordList({ passwords, onDelete }) {
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard");
    } catch {
      alert("Copy failed — allow clipboard permissions");
    }
  };

  return (
    <div>
      <h3>Saved passwords</h3>
      <ul>
        {passwords.map((p) => (
          <li key={p.id}>
            <strong>{p.site}</strong> — {p.password}
            <button onClick={() => handleCopy(p.password)}>Copy</button>
            <button onClick={() => onDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

