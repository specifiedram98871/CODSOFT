import { useEffect, useState } from "react";

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

  return (
    <div>
      <h1>Projects</h1>
      <div className="grid grid-cols-3 bg-orange-300 gap-5 rounded-lg p-4 ">
        {projects.slice(0, 3).map((project) => {
          return (
            <div className="bg-orange-500" key={project.id}>
              <h2 className="text-2xl underline">{project.name}</h2>
              <p>{project.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Project;
