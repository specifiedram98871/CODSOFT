import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setProjects,
  useAssignProjectMutation,
  useDeleteProjectMutation,
} from "../../redux/projectSlice";
import { useGetProjectsQuery } from "../../redux/projectSlice";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Date from "./Date";
import UserPopup from "../../pages/UserPopup";

const Project = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [deleteProject] = useDeleteProjectMutation();
  const [assignProject] = useAssignProjectMutation();
  const { data, error, isLoading } = useGetProjectsQuery();
  const projects = useSelector((state) => state.project.project);
  const [showableProjects, setShowableProjects] = useState(3);

  useEffect(() => {
    if (data) {
      dispatch(setProjects(data));
    }
  }, [data, dispatch]);

  const handleShowMore = () => {
    setShowableProjects(showableProjects + 3);
  };
  const handleShowLess = () => {
    setShowableProjects(showableProjects - 3);
  };
  const handleEdit = (project) => {
    navigate("/create-project", { state: { existingProject: project } });
  };
  const handleAssign = (project_id) => {
    setCurrentProjectId(project_id);
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleDelete = async (projectId) => {
    if (projectId) {
      const { data } = await deleteProject(projectId);
      if (data) {
        toast(data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Projects</h1>
      <div className="grid grid-cols-3 bg-orange-300 gap-5 rounded-lg p-4">
        {projects.slice(0, showableProjects).map((project) => (
          <div
            className="bg-orange-500 p-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            key={project.id}
          >
            <Link to={`/projectView/${project.id}`}>
              <h3 className="text-2xl underline">{project.name}</h3>
              <p>{project.description}</p>
              <Date date={project.start_time} />
              <Date date={project.deadline} />
              {project.subtasks.map((subtask) => (
                <div key={subtask.id}>
                  <h4 className="font-semibold">{subtask.name}</h4>
                  <p>{subtask.description}</p>
                </div>
              ))}
            </Link>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleAssign(project.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition duration-300"
              >
                Assign
              </button>
              {currentProjectId === project.id && (
                <UserPopup isDropdownVisible={isDropdownVisible} />
              )}
              <div>
                <button
                  onClick={() => handleEdit(project)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                  onClick={() => handleDelete(project.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleShowMore}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Load more
        </button>
        <button
          onClick={handleShowLess}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-300"
        >
          Load less
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Project;
