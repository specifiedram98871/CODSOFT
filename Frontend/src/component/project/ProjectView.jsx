import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserPopup from '../../pages/UserPopup';

const ProjectView = () => {
  const { project_id } = useParams();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const project = useSelector((state) => state.project.project.find((p) => p.id == project_id));

  const handleAssign = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle cases where date is missing
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen bg-amber-200">
        <p className="text-2xl font-bold text-gray-800">Project Not Found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-amber-200 py-10 px-4 md:px-0"> {/* Added padding for responsiveness */}
      <div className="max-w-4xl mx-auto w-full bg-white shadow-md rounded-lg p-8"> {/* Centered and constrained width */}
        <h1 className="text-4xl font-bold mb-6 text-gray-800">{project.name}</h1>
        <div className="mb-4"> {/* Grouped project details */}
          <p className="text-gray-700 mb-2">Description:{project.description}</p>
          <div className="flex justify-between"> {/* Used flexbox for layout */}
            <p className="text-gray-600">Start Date: {formatDate(project.start_time)}</p>
            <p className="text-gray-600">End Date: {formatDate(project.deadline)}</p>
          </div>
          <p className="text-gray-600 mt-2">Progress: {project.progress}%</p>
        </div>

        <div> {/* Subtasks Section */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sub Tasks</h2> {/* Added heading */}
          {project.subtasks.length > 0 ? (
            project.subtasks.map((subtask) => (
              <div key={subtask.id} className="bg-gray-100 rounded-md p-4 mb-4"> {/* Added background and spacing */}
                <p className="text-gray-700 font-medium">{subtask.description}</p>
                <p className="text-gray-600">Status: {subtask.name || "N/A"}</p> {/* Handle missing status */}
              </div>
            ))
          ) : (
            <p className="text-gray-600">No subtasks yet.</p> /* Display message if no subtasks */
          )}
        </div>

        <button
          onClick={handleAssign}
          className="mt-6 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300 font-medium" // Improved button styling
        >
          Assign
        </button>
        {isDropdownVisible && <UserPopup isDropdownVisible={isDropdownVisible} onSelectUser={handleAssign} />}
      </div>
      
    </div>
  );
};

export default ProjectView;