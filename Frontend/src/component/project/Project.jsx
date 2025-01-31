import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProjects } from "../../redux/projectSlice";
import { useGetProjectsQuery } from "../../redux/projectSlice";
import Date from "./Date";

const Project = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetProjectsQuery(); // Correct usage
  const projects = useSelector((state) => state.project); // Accessing Redux state

  useEffect(() => {
    if (data) {
      dispatch(setProjects(data.todos));
    }
  }, [data, dispatch]);

  const handleDelete = (projectId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (confirmed) {
      // Dispatch delete action or make API call to delete the project
      console.log(`Project with ID ${projectId} deleted`);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Projects</h1>
      <div className="grid grid-cols-3 bg-orange-300 gap-5 rounded-lg p-4">
        {projects.map((project) => (
          <div className="bg-orange-500 p-4 rounded-lg" key={project.id}>
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
              <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
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
    </div>
  );
};

export default Project;
