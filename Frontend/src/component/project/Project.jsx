import { useEffect, useState } from "react";
import  Date  from "./Date";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const data = await response.json();
      setProjects(data.todos);
      console.log(data.todos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects]
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  }

  const handleSubtaskChange = (index, subtaskIndex, field, value) => { 
    const updatedProjects = [...projects]
    updatedProjects[index].subtasks[subtaskIndex][field] = value;
    setProjects(updatedProjects);
  }

  return (
    <div>
      <h1>Projects</h1>
      <div className="grid grid-cols-3 bg-orange-300 gap-5 rounded-lg p-4 ">
        {projects.slice(0, 3).map((project,index) => {
          return (
            <div className="bg-orange-500" key={project.id}>
              <input
                type="text"
                value={project.name}
                onChange={(e)=>handleProjectChange(index,"name",e.target.value)}
                className="text-2xl underline" />
              <p>Description</p>
              <input
                type="text"
                value={project.description}
              onChange={(e)=>handleProjectChange(index,"description",e.target.value)}
                className="text-2xl underline" />
              <Date date={project.start_time} onChange={(date) => handleProjectChange(index, "start_time", date)} />
              <Date date={project.deadline} onChange={(date) => handleProjectChange(index, "deadline", date)} />

              {project.subtasks.map((subtask) => {
                return (
                  <div key={subtask.id}>
                    <h3>{subtask.name}</h3>
                    <p>{subtask.description}</p>
                  </div>
                );
              })}

<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Project;
