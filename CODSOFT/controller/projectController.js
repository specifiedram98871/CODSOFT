import pool from "../database/db.js";

const addProject = async (req, res) => {
  try {
    const { name, description, subtasks, start_time, deadline } = req.body;

    const newProject = await pool.query(
      "INSERT INTO projects (name, description, subtasks, start_time, deadline) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, description, JSON.stringify(subtasks), start_time, deadline]
    );
    res.status(201).json({
      success: true,
      message: "Project was created",
      newProject: newProject.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteProject = async (req, res) => { 
  const { project_id } = req.params;
  try {
    const query = "DELETE FROM projects WHERE id =$1 RETURNING *";
    const result = await pool.query(query, [project_id]);
    console.log(result.rows[0]);
    if (result.rows.length > 0) {
      const deletedProject = result.rows[0];
      res.status(200).json({ message: "Project deleted", deletedProject });
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    console.log(error);
  }
}

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

const editProject = async (req, res) => {
  const { project_id } = req.params;
  const id = project_id;
  // console.log("id", project_id);
  const data = await pool.query("SELECT * FROM projects WHERE id = $1", [project_id]);
  // console.log(data.rows[0]);
  const { name, description, start_time, deadline } = req.body;
  // console.log(name, description, start_time, deadline);
  try { 
     const query = `
      UPDATE projects
      SET name = $1, description = $2, start_time = $3, deadline = $4
      WHERE id = $5
      RETURNING *;
    `;
    const values = [name, description, start_time, deadline, id];
    const result = await pool.query(query, values);
    if (result.rows.length > 0) {
      const updatedProject = result.rows[0];
      res.status(200).json({ message: "Project updated", updatedProject });
    } else {
      res.status(404).json({ message: "Project not found" });
    }

  }
  catch (error) {
    console.log(error);
  }
}
export { addProject, assignTask,trackProgress,editProject,deleteProject };
