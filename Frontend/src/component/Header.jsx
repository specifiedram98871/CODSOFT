import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout, useLogOutUserMutation } from "../redux/userSlice";
const Header = ({ user }) => {
  const [logO] = useLogOutUserMutation();
  const Out = async() => {
    const response =await logO().unwrap();
    if (response) {
      dispatch(logout());
      console.log(response);
    }
  };
  const dispatch = useDispatch();
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">MyApp</div>
        <nav className="space-x-4">
          <Link to="/create-project" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link to="/login" className="hover:text-gray-300">
            Contact
          </Link>
          { user&&
            <Link to="/login" className="hover:text-gray-300" onClick={() => Out()}>
              LogOut
            </Link>}
        </nav>
      </div>
    </header>
  );
};

export default Header;
