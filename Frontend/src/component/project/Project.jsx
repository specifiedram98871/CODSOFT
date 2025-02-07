import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProjects, useDeleteProjectMutation } from "../../redux/projectSlice";
import { useGetProjectsQuery } from "../../redux/projectSlice";
import { ToastContainer, toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
import Date from "./Date";

const Project = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteProject] = useDeleteProjectMutation();
  const { data, error, isLoading } = useGetProjectsQuery();
  const projects = useSelector((state) => state.project.project);
  const [showableProjects, setShowableProjects] = useState(3);
  useEffect(() => {
    if (data) {
      dispatch(setProjects(data));
    }
  }, [data, dispatch ,projects]);
  
  const handleShowMore = () => {
    setShowableProjects(showableProjects + 3);
  }
  const handleShowLess = () => {
    setShowableProjects(showableProjects - 3);
  }
  const handleEdit = (project) => {
    navigate('/create-project', { state: { existingProject: project } });
    // Set project to be edited
  };

  const handleDelete = async(projectId) => {
    if (projectId) {
      const {data} = await deleteProject(projectId);
      console.log(data);
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
    <div>
      <h1>Projects</h1>
      <div className="grid grid-cols-3 bg-orange-300 gap-5 rounded-lg p-4">
        {projects.slice(0,showableProjects).map((project) => (
          <div className="bg-orange-500 p-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105" key={project.id}>
            <h3 className="text-2xl underline">{project.name}</h3>
            <p>{project.description}</p>
            <Date date={project.start_time} />
            <Date date={project.deadline} />
            {project.subtasks.map((subtask) => (
              <div key={subtask.id}>
                <h4>{subtask.name}</h4>
                <p>{subtask.description}</p>
              </div>
            ))}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleEdit(project)}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(project.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4">
        <button onClick={handleShowMore} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Load more</button>
        <button onClick={handleShowLess} className="bg-red-500 text-white px-6 py-2 rounded mt-4 ">Load less</button>
      </div>

<ToastContainer/>
    </div>
  );
};

export default Project;
