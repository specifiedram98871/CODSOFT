import React, { useState, useEffect } from "react";
import { useGetAllUserQuery } from "../redux/userSlice";

const UserPopup = ({ isDropdownVisible, onSelectUser }) => {
  const { data: users, error, isLoading } = useGetAllUserQuery({});
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (users) {
      setUserList(users); // Update the users state when data is available
    }
  }, [users]);

  const handleUserSelect = (user) => {
    onSelectUser(user); // Pass selected user to parent component
    setIsDropdownVisible(false); // Close dropdown after selection
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div
      className={`${
        isDropdownVisible ? "block" : "hidden"
      } relative transition transform duration-300 ease-in-out`}
    >
      <ul className="absolute bg-white border border-gray-300 rounded shadow-lg max-h-56 overflow-y-auto mt-2 w-48 z-10">
        {userList.map((user) => (
          <li
            key={user.id}
            onClick={() => handleUserSelect(user)}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
          >
            <span>{user.name}</span>
            <button
              onClick={() => handleUserSelect(user)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            >
              Assign
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPopup;
