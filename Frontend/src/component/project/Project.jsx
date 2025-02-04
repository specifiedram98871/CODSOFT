import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProjects, removeProject } from "../../redux/projectSlice";
import {
  useGetProjectsQuery,
  useDeleteProjectMutation,
} from "../../redux/projectSlice";
import Date from "./Date";
import CreateProject from "./CreateProject";

const Project = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetProjectsQuery(); // Correct usage
  const [dele] = useDeleteProjectMutation();
  const projects = useSelector((state) => state.project); // Accessing Redux state
  const [showMore, setShowMore] = useState(4);
  const [editingProject, setEditingProject] = useState(null);
  const [creatingProject, setCreatingProject] = useState(false);

  function show() {
    setShowMore((prev) => prev + 4);
  }
  function showLess() {
    if (showMore === 4) return;
    setShowMore((prev) => prev - 4);
  }
  useEffect(() => {
    if (data) {
      dispatch(setProjects(data.todos));
    }
  }, [data, dispatch]);

  const handleDelete = async (projectId) => {
    if (!projectId) {
      console.error("Project ID not found");
    }
    dispatch(removeProject({ project_id: projectId }));
    const result = await dele(projectId);
    console.log(result);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
  };

  const closeEditForm = () => {
    setEditingProject(null);
  };

  const handleCreate = () => {
    setCreatingProject(true);
  };

  const closeCreateForm = () => {
    setCreatingProject(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Projects</h1>
      <div className="grid grid-cols-3 bg-orange-300 gap-5 rounded-lg p-4">
        {projects.slice(0, showMore).map((project) => (
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
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => handleEdit(project)}
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
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCreate}
        >
          Create New Project
        </button>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={show}
          className="bg-sky-500 text-white px-4 py-2 rounded"
        >
          Show More
        </button>
        <button
          onClick={showLess}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Show Less
        </button>
      </div>
      {editingProject && (
        <CreateProject
          existingProject={editingProject}
          onClose={closeEditForm}
        />
      )}
      {creatingProject && <CreateProject onClose={closeCreateForm} />}
    </div>
  );
};

export default Project;
