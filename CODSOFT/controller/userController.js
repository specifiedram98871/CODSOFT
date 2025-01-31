import pool from "../database/db.js";
import { authorize } from "../middleware/authorize.js";
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await pool.query(
      "SELECT * FROM codsoft WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        existingUser: existingUser.rows[0],
        message: "User already exists",
      });
    }
    const newUser = await pool.query(
      "INSERT INTO codsoft(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *",
      [name, email, password, role]
    );
    const { token, user } = await authorize(newUser.rows[0]);
    console.log(newUser.rows[0]);
    res.status(201).json({
      user: newUser.rows[0],
      message: "User was created",
      success: true,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query(
      "SELECT * FROM codsoft WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (user.rows.length > 0) {
      // const { token } = await authorize(user.rows[0]);
      // res.json({
      //   user: user.rows[0],
      //   message: "User logged in",
      //   success: true,
      //   token: token,
      // });
      console.log(user.rows[0]);
      authorize(user.rows[0], 200, res);
    } else {
      res.status(404).json({
        message: "User does not exist",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      message: "An error occurred during login",
      success: false,
    });
  }
};


const getAllUser = async (req, res) => {
  try {
    const newQuery = await pool.query("SELECT * FROM codsoft");
    res.json({
      user: newQuery.rows,
      message: "Users",
    });
    console.log(newQuery.rows);
  } catch (error) {
    console.log(error);
  }
};

const adminLogin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newQuery = await pool.query(
      "INSERT INTO codsoft (name,email,password,role)  VALUES($1,$2,$3,'admin') RETURNING *",
      [name, email, password]
    );
    const token = await authorize(newQuery.rows[0]);
  } catch (error) {}
};


const userDetails = async (req, res) => { 
  const user = req.user;
  res.status(200).json(
    user
   );
}


export { registerUser, loginUser, getAllUser ,userDetails};
