import express from "express";
import pool from "./database/db.js";
import userRouter from "./routes/userRoute.js";
import projectRouter from "./routes/projectRoute.js";
import { trackProgress } from "./controller/projectController.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";


dotenv.config();
const PORT = 5000;
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/user", userRouter);
app.use("/project", projectRouter);

// Create a todo
app.post("/todos", async (req, res) => {
  const { name } = req.body;
  try {
    const newTodo = await pool.query(
      "INSERT INTO codsoft (name) VALUES($1) RETURNING *",
      [name]
    );
    res.json({
      message: "Todo was created",
      newTodo: newTodo.rows[0],
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a todo
app.get("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM codsoft WHERE todo_id = $1", [
      id,
    ]);
    res.json({
      message: "Todo retrieved",
      todo: todo.rows[0],
    });
  } catch (error) {
    console.error("Error retrieving todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM projects");
    console.log("vayo")
    // console.log(todos.rows);
    res.json({
      todos:todos.rows
    }
    );
  } catch (error) {
    console.error("Error retrieving todos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Track progress
app.get("/track", trackProgress);

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await pool.query(
      "DELETE FROM codsoft WHERE todo_id = $1",
      [id]
    );
    res.json({
      message: "Todo deleted",
      deletedTodo,
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedTodo = await pool.query(
      "UPDATE codsoft SET name = $1 WHERE todo_id = $2 RETURNING *",
      [name, id]
    );
    res.json({
      message: "Todo updated",
      updatedTodo: updatedTodo.rows[0],
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
