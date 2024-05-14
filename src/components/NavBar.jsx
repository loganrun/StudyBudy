import React from 'react';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logoutSuccess, logoutError } from '../reducers/authReducer';
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const dispatch = useDispatch();
  const nav = useNavigate()

  const handleLogOut = () => {
   try {
    dispatch(logoutSuccess)
    nav('/login')
    
   } catch (error) {
    dispatch(logoutError({ error}))
   }
  }
  return (
    <nav className="bg-gray-600 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Study Buddy</div>
        <Link  to="/record"className="bg-rose-600 text-white font-bold py-2 px-4 rounded">
          New Lesson?
        </Link>
        <button className="bg-rose-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleLogOut}> Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;