import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  addProject,
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "../../redux/projectSlice";
import Date from "./Date";

const CreateProject = ({ existingProject, onClose }) => {
  const [updateProject] = useUpdateProjectMutation();
  const dispatch = useDispatch();
  const [createProject] = useCreateProjectMutation();
  const [project, setProject] = useState({
    name: "",
    description: "",
    start_time: "",
    deadline: "",
    subtasks: [{ name: "", description: "" }],
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (existingProject) {
      setProject(existingProject);
    }
  }, [existingProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubtaskChange = (index, field, value) => {
    const updatedSubtasks = [...project.subtasks];
    updatedSubtasks[index][field] = value;
    setProject({ ...project, subtasks: updatedSubtasks });
  };

  const addSubtask = () => {
    setProject({
      ...project,
      subtasks: [...project.subtasks, { name: "", description: "" }],
    });
  };

  const removeSubtask = (index) => {
    const updatedSubtasks = project.subtasks.filter((_, i) => i !== index);
    setProject({ ...project, subtasks: updatedSubtasks });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        project.name &&
        project.description &&
        project.start_time &&
        project.deadline
      ) {
        if (existingProject) {
          dispatch(updateProject(project));
          const response=await updateProject(project).unwrap();
        } else {
          dispatch(addProject(project));
          await createProject(project).unwrap();
        }
        toast("Project saved successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
        setProject({
          name: "",
          description: "",
          start_time: "",
          deadline: "",
          subtasks: [{ name: "", description: "" }],
        });
        if (onClose) onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-project">
      <h2>{existingProject ? "Edit Project" : "Create New Project"}</h2>
      {success && (
        <p className="success-message">Project saved successfully!</p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Name</label>
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
            placeholder="Enter project name"
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            placeholder="Enter project description"
            required
          />
        </div>
        <div>
          <label>Start Time</label>
          <Date
            date={project.start_time}
            onChange={(date) => setProject({ ...project, start_time: date })}
          />
        </div>
        <div>
          <label>Deadline</label>
          <Date
            date={project.deadline}
            onChange={(date) => setProject({ ...project, deadline: date })}
          />
        </div>
        <div>
          <label>Subtasks</label>
          {project.subtasks.map((subtask, index) => (
            <div key={index} className="subtask-item">
              <input
                type="text"
                placeholder="Subtask Name"
                value={subtask.name}
                onChange={(e) =>
                  handleSubtaskChange(index, "name", e.target.value)
                }
                required
              />
              <input
                type="text"
                placeholder="Subtask Description"
                value={subtask.description}
                onChange={(e) =>
                  handleSubtaskChange(index, "description", e.target.value)
                }
                required
              />
              <button type="button" onClick={() => removeSubtask(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addSubtask}>
            Add Subtask
          </button>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            {existingProject ? "Save Changes" : "Create Project"}
          </button>
        </div>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default CreateProject;
