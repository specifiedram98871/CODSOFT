import jwt from "jsonwebtoken";
import pool from "../database/db.js";
const authorize = async (user) => {
  try {
    const token = jwt.sign({ name: user.name, email: user.email,role:user.role }, "aalu", { expiresIn: "1d" });
    // console.log(token);
    return ({ user, token });
  } catch (error) {
    console.log(error);
  }
};

const authenticate = async (req, res,next) => {
  try {
    console.log(req.headers.authorization);
    const token = await req.headers.authorization.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, "aalu");
    // console.log(decoded);
    req.user = decoded;
    next();
    // return decoded.role;
  } catch (error) {
    consloe.log(error);
  }
}
export  {authorize,authenticate};
