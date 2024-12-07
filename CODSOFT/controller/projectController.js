import pool from "../database/db.js";

const addProject = async (req, res) => {
  try {
    const { name, description, subtasks, start_time, deadline } = req.body;

    const newProject = await pool.query(
      "INSERT INTO projects (name, description, subtasks, start_time, deadline) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, description, JSON.stringify(subtasks), start_time, deadline]
    );
    res.status(201).json({
      message: "Project was created",
      newProject: newProject.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const assignTask = async (req, res) => {
  try {
   
    const { project_id,subtask_id} = req.params;
    const user = "bangdu";
    
    const project = await pool.query("SELECT subtasks FROM projects WHERE id = $1", [project_id]);
    const subtasks = project.rows[0].subtasks;
    // console.log(subtasks);
    const updatedSubtask = subtasks.map((subtask) => {
      console.log(subtask.assigned);
      if (subtask.id == subtask_id) {
        subtask.assigned = user;
        // subtask.status = "assigned";
      //  console.log(subtask.assigned);
      }
      return subtask;
      // console.log(subtask);
    })
    // console.log(updatedSubtask);
    const assignTask =await pool.query("UPDATE projects SET subtasks = $1 WHERE id = $2 RETURNING *", [JSON.stringify(updatedSubtask), project_id]);
    res.status(201).json({  message: "Task was assigned",assignTask:assignTask.rows[0] });
  } catch (error) {
    console.log(error);
  }
}

const trackProgress = async (req, res) => {
  const project_id = 1;
  const subtasks = await pool.query(
    "SELECT subtasks FROM projects WHERE id=$1",
    [project_id]
  );
  const subtask = subtasks.rows[0].subtasks;
  // const subtaskLength = subtask.length;
  const completed = subtask.filter((subtask) => {
    return subtask.status === "completed";
  });
  const percentage = progress(subtask, completed);
  console.log(percentage);

  res.status(201).json({ subtask });
};
const progress = (subtasks, completed) => { 
  return completed.length / subtasks.length;
}

export { addProject, assignTask,trackProgress };
