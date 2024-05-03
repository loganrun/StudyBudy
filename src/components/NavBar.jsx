import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-gray-600 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Study Buddy</div>
        <Link  to="/record"className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          New Lesson?
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;