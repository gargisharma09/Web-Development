import { useState,useEffect } from "react";
import PasswordForm from "../components/PasswordForm";
import PasswordList from "../components/PasswordList";

function Home() {
  const [passwords, setPasswords] = useState([]);

   useEffect(() => {
    const savedPasswords = JSON.parse(localStorage.getItem("passwords"));
    if (savedPasswords) {
      setPasswords(savedPasswords);
    }
  }, []);

  // Save passwords to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(passwords));
  }, [passwords]);

  // Add a new password
  const addPassword = (passwordObj) => {
    setPasswords([...passwords, passwordObj]);
  };

  // Delete password
  const deletePassword = (id) => {
    setPasswords(passwords.filter((item) => item.id !== id));
  };

  return (
    <div className="home-container">
      <PasswordForm addPassword={addPassword} />

      <PasswordList passwords={passwords} deletePassword={deletePassword} />
    </div>
  );
}

export default Home;
