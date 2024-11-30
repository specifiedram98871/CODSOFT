import { Router } from "express";
import { addProject ,assignTask} from "../controller/projectController.js";
import {authenticate} from "../middleware/authorize.js";
import checkAdmin from "../middleware/checkAdmin.js";
const projectRouter = Router();

projectRouter.post("/addproject", authenticate, checkAdmin, addProject);
projectRouter.post("/assign/:project_id/:subtask_id", authenticate, checkAdmin, assignTask);

export default projectRouter;