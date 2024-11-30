import pool from "../database/db.js";
import {authorize} from "../middleware/authorize.js";
const registerUser = async (req, res) => {
  try {
    const { name, email, password,role } = req.body;
    const existingUser = await pool.query(
      "SELECT * FROM codsoft WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({
          existingUser: existingUser.rows[0],
          message: "User already exists",
        });
    }
    const newUser = await pool.query(
      "INSERT INTO codsoft(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *",
      [name, email, password ,role]
    );
    const { token, user } = await authorize(newUser.rows[0]);
    console.log(newUser.rows[0]);
    res
      .status(201)
      .json({
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
    const newQuery = await pool.query("ALTER TABLE codsoft ADD COLUMN role VARCHAR(10)");
    if (newQuery) {
      console.log("Success");
    }
  } catch (error) {
    
  }
}



const adminLogin =async(req,res)=>{
  try {
    const {name,email,password} = req.body
    const newQuery = await pool.query("INSERT INTO codsoft (name,email,password,role)  VALUES($1,$2,$3,'admin') RETURNING *", [name, email, password]);
    const token = await authorize(newQuery.rows[0]);

  } catch (error) {
    
  }
}
export { registerUser, loginUser };
