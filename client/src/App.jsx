/*import Greeting from "./SiteList";

const sites= ["google.com", "facebook.com","github.com"];
 export default function App() {
  return (
    <div> 
      <SiteList sites={sites} />
    </div>
  );
 }
  */
 //use state basics
 /*import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0); 

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}
*/
// parent component holds the list 
/*import { useState } from "react";
import PasswordForm from "./PasswordForm";
import PasswordList from "./PasswordList";

export default function App() {
  const [passwords, setPasswords] = useState([]);

  const addPassword = (entry) => {
    // create a new array (immutability)
    setPasswords((prev) => [...prev, { id: Date.now(), ...entry }]);
  };

  return (
    <div>
      <h1>Password Manager (Day 2)</h1>
      <PasswordForm onAdd={addPassword} />
      <PasswordList passwords={passwords} />
    </div>
  );
}
*/
//use effect
import { useState, useEffect } from "react";
import PasswordForm from "./PasswordForm";
import PasswordList from "./PasswordList";

export default function App() {
  const [passwords, setPasswords] = useState([]);

  // Load once on mount
  useEffect(() => {
    const raw = localStorage.getItem("pwds");
    if (raw) setPasswords(JSON.parse(raw));
  }, []);

  // Save whenever passwords change
  useEffect(() => {
    localStorage.setItem("pwds", JSON.stringify(passwords));
  }, [passwords]);

  const addPassword = (entry) => {
    setPasswords((prev) => [...prev, { id: Date.now(), ...entry }]);
  };

  const deletePassword = (id) => {
    setPasswords((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h1>Password Manager (Day 3)</h1>
      <PasswordForm onAdd={addPassword} />
      <PasswordList passwords={passwords} onDelete={deletePassword} />
    </div>
  );
}
