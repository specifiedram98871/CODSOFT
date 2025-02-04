import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/userSlice";
const Header = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">PM</div>
        <nav className="space-x-4">
          <Link to="/create-project" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/project" className="hover:text-gray-300">
            Project
          </Link>
          <Link to="/login" className="hover:text-gray-300">
            Contact
          </Link>
          { user&&
            <Link to="/login" className="hover:text-gray-300" onClick={() =>dispatch(logout())}>
              LogOut
            </Link>}
        </nav>
      </div>
    </header>
  );
};

export default Header;
