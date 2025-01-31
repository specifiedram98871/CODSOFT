import jwt from "jsonwebtoken";
import pool from "../database/db.js";

const authorize = async (user, statusCode, res) => {
  try {
    const token = getToken(user.email);
    // console.log(token);
    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none", //Allow cross-site cookies
      secure: true,
    };
    // return ({ user, token });
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
const getToken = (email) => {
  return jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

const authenticate = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Please log in" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await returnUser(decoded.email);
    // console.log("user",user)
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

const returnUser = async (email) => {
  const result = await pool.query("SELECT * FROM codsoft WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};
export { authorize, authenticate };
