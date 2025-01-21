import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProjects, updateSubtask } from "../../redux/projectSlice";
import Date from "./Date";

const Project = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project); // Accessing Redux state

  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const data = await response.json();
      dispatch(setProjects(data.todos));
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleSubtaskChange = (projectId, subtaskId, field, value) => {
    dispatch(
      updateSubtask({
        project_id: projectId,
        subtask_id: subtaskId,
        field,
        value,
      })
    );
  };

  return (
    <div>
      <h1>Projects</h1>
      <div className="grid grid-cols-3 bg-orange-300 gap-5 rounded-lg p-4">
        {projects.map((project) => (
          <div className="bg-orange-500" key={project.id}>
            <input
              type="text"
              value={project.name}
              onChange={(e) =>
                dispatch(
                  updateSubtask({
                    project_id: project.id,
                    field: "name",
                    value: e.target.value,
                  })
                )
              }
              className="text-2xl underline"
            />
            <p>Description</p>
            <input
              type="text"
              value={project.description}
              onChange={(e) =>
                dispatch(
                  updateSubtask({
                    project_id: project.id,
                    field: "description",
                    value: e.target.value,
                  })
                )
              }
              className="text-2xl underline"
            />
            <Date
              date={project.start_time}
              onChange={(date) =>
                dispatch(
                  updateSubtask({
                    project_id: project.id,
                    field: "start_time",
                    value: date,
                  })
                )
              }
            />
            <Date
              date={project.deadline}
              onChange={(date) =>
                dispatch(
                  updateSubtask({
                    project_id: project.id,
                    field: "deadline",
                    value: date,
                  })
                )
              }
            />
            {project.subtasks.map((subtask) => (
              <div key={subtask.id}>
                <h3>{subtask.name}</h3>
                <input
                  type="text"
                  value={subtask.description}
                  onChange={(e) =>
                    handleSubtaskChange(
                      project.id,
                      subtask.id,
                      "description",
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
