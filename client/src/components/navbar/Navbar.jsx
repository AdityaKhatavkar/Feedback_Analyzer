import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

function Navbar({ toggleTheme }) {
  const [info, setInfo] = useState({});
  const [isDarkTheme, setIsDarkTheme] = useState(true); // To track the current theme
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/logout', {}, { withCredentials: true });
      const content = response.data;
      toast.success("Logout successfully");
      navigate("/login");
    } catch (err) {
      const ans = err.response.data.message;
      toast.error(ans);
      navigate("/login");
    }
  };

  const checkUserInfo = async () => {
    try {
      const response = await axios.post('/user/userinfo', {}, { withCredentials: true });
      setInfo(response.data.data);
    } catch (err) {
      const ans = err.response.data.message;
      console.log(ans);
      toast.error(ans);
      navigate("/login");
    }
  };

  useEffect(() => {
    checkUserInfo();
  }, []);

  // Handle the theme toggle
  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
    toggleTheme(); // Call the theme toggle function passed from the App component
  };

  return (
    <div className='flex z-1 fixed w-full'>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to='/' className="btn btn-ghost text-xl">Feedback</Link>
        </div>
        <div className="flex-none">

          {/* Theme Toggle Button */}
          <label className="swap swap-rotate">
            {/* Hidden checkbox to control theme */}
            <input
              type="checkbox"
              checked={!isDarkTheme}
              onChange={handleThemeToggle}
            />

            {/* Sun icon for light mode */}
            <svg
              className="swap-off h-6 w-6 fill-current" // Adjust icon size
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* Moon icon for dark mode */}
            <svg
              className="swap-on h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          {/* User menu */}
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Options</summary>
                <ul className="bg-base-100 rounded-t-none p-2 w-36">
                  <li><Link to='/formcreation'>CREATE-FORM</Link></li>
                  <li><Link to='/jsondata'>JSON-DATA</Link></li>
                  <li><Link to='/apigenration'>GENERATE-API</Link></li>
                </ul>
              </details>
            </li>
          </ul>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src="https://imgs.search.brave.com/Jr4F26FmavL_arvWQ51hTUtcX3UgHOWlH0F9fqfo5Cc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/c3ZnLm9yZy9pbWcv/YWJzdHJhY3QtdXNl/ci1mbGF0LTQucG5n"
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><a>{info.username}</a></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
