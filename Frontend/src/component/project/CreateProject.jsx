import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  useAddProjectMutation,
  useUpdateProjectMutation,
} from "../../redux/projectSlice";
import Date from "./Date";

const CreateProject = () => {
  const location = useLocation();
  const existingProject = location.state?.existingProject || null;
  const [addProject] = useAddProjectMutation();
  const [editProject] = useUpdateProjectMutation();
  const [project, setProject] = useState({
    name: "",
    description: "",
    start_time: "",
    deadline: "",
    subtasks: [{ name: "", description: "" }],
  });

  useEffect(() => {
    if (existingProject) {
      setProject(existingProject); // Load data when editing
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

    if (
      project.name &&
      project.description &&
      project.start_time &&
      project.deadline
    ) {
      try {
        let response;
        if (existingProject) {
          // Update project (PUT request)
          response = await editProject({
            ...project,
            id: existingProject.id,
          }).unwrap();
        } else {
          // Create new project (POST request)
          response = await addProject(project).unwrap();
        }

        if (response) {
          toast(response.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }

        // Reset project state
        setProject({
          name: "",
          description: "",
          start_time: "",
          deadline: "",
          subtasks: [{ name: "", description: "" }],
        });

        if (existingProject) {
          // Close editing form after update (optional, based on your implementation)
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="create-project">
      <h2>{existingProject ? "Edit Project" : "Create New Project"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Name</label>
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
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
                value={subtask.name}
                onChange={(e) =>
                  handleSubtaskChange(index, "name", e.target.value)
                }
                required
              />
              <input
                type="text"
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
        <button type="submit">
          {existingProject ? "Update Project" : "Create Project"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateProject;
