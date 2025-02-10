import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserPopup from '../../pages/UserPopup';

const ProjectView = () => {
  const { project_id } = useParams();  
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const project = useSelector((state) => state.project.project.find((p) => p.id == project_id));
  console.log(project);

  const handleAssign = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {project && (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">{project.title}</h1>
          <p className="text-gray-700 mb-2">{project.description}</p>
          <p className="text-gray-600">Start Date: {project.startDate}</p>
          <p className="text-gray-600">End Date: {project.endDate}</p>
          <p className="text-gray-600">Progress: {project.progress}%</p>
          <button
            onClick={handleAssign}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Assign
          </button>
        </div>
      )}
      <UserPopup isDropdownVisible={isDropdownVisible} />
    </div>
  );
};

export default ProjectView;
