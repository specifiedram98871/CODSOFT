import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { addProject } from "../../redux/projectSlice";
import Date from "./Date";

const CreateProject = () => {
  const dispatch = useDispatch();
  const [project, setProject] = useState({
    name: "",
    description: "",
    start_time: "",
    deadline: "",
    subtasks: [{ name: "", description: "" }],
  });
  const [success, setSuccess] = useState(false);

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
    try {
    e.preventDefault();
    if (
      project.name &&
      project.description &&
      project.start_time &&
      project.deadline
    ) {
      dispatch(addProject(project));
      const response = await fetch("http://localhost:5000/project/addproject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      })
      const data = await response.json();
      console.log(data);
      if(data.success){
        toast(data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });;
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
      setProject({
        name: "",
        description: "",
        start_time: "",
        deadline: "",
        subtasks: [{ name: "", description: "" }],
      });
    }
      } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <div className="create-project">
      <h2>Create New Project</h2>
      {success && (
        <p className="success-message">Project created successfully!</p>
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
        <button type="submit" className="submit-btn">
          Create Project
        </button>
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
