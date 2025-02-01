import { Router } from "express";
import { registerUser, loginUser, getAllUser, userDetails } from "../controller/userController.js";
import { authenticate } from "../middleware/authorize.js";
const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/getUsers", getAllUser);
userRouter.get("/me", authenticate,userDetails);

export default userRouter;