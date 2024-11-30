import express from "express";
import pool from "./database/db.js";
import userRouter from "./routes/userRoute.js";
import projectRouter from "./routes/projectRoute.js";
import cors from "cors";
const PORT = 5000;
const app = express();

//to allow cross origin
app.use(
  cors({
    origin: "http://localhost:5",
  })
);

app.use(express.json());
//routes

//user routes
app.use("/user", userRouter);
//project routes
app.use("/project", projectRouter);
//create a todo
app.post("/todos", async (req, res) => {
  const { name } = req.body;
  try {
    const newtodo = await pool.query(
      "INSERT INTO codsoft (name) VALUES($1) RETURNING *",
      [name]
    );
    // console.log(req.body);
    res.json({
      message: "Todo was created",
      newtodo: newtodo.rows[0]
    });
  } catch (error) {
    console.log(error);
  }
});
//get a todo

app.get("/todo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(req.params);
        const todo = await pool.query("SELECT * FROM codsoft WHERE todo_id = $1", [id]);
        res.json({
            message: "get",
            todo: todo.rows[0]
        })
  } catch (error) {}
});
//get all todos

app.get("/todos", async (req, res) => {
    try {
        const todos = await pool.query("SELECT * FROM codsoft");
        res.json({
            message: "get",
            todos: todos.rows
        })
  } catch (error) {
    console.log(error);
  }
});
//delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await pool.query("DELETE FROM codsoft WHERE todo_id = $1", [id]);
        res.json({
            message: "deleted",
            deletedTodo
        })
  } catch (error) {
    console.log(error);
  }
});
//update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedTodo = await pool.query("UPDATE codsoft SET name =$1 WHERE todo_id =$2", [name, id]);
        res.json({
            message: "updated",
            updatedTodo: updatedTodo.rows[2]
        })
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log("Server is running");
});
