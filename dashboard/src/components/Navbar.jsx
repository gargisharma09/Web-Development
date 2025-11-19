import { Link } from "react-router-dom";
import{useState} from "react";


export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold">Productivity Dashboard</h1>

      <div className="flex gap-6 text-lg">
        <Link className="hover:text-blue-400" to="/tasks">Tasks</Link>
        <Link className="hover:text-blue-400" to="/habits">Habits</Link>
        <Link className="hover:text-blue-400" to="/goals">Goals</Link>
        <Link className="hover:text-blue-400" to="/analytics">Analytics</Link>
      </div>
    </nav>
  );
}
