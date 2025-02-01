import { Router } from "express";
import { addProject ,assignTask,editProject,deleteProject} from "../controller/projectController.js";
import {authenticate} from "../middleware/authorize.js";
import checkAdmin from "../middleware/checkAdmin.js";
const projectRouter = Router();

projectRouter.post("/addproject", addProject);
projectRouter.post("/assign/:project_id/:subtask_id", authenticate, checkAdmin, assignTask);
projectRouter.post("/edit/:project_id", editProject);
projectRouter.delete("/delete/:project_id", authenticate, checkAdmin, deleteProject);

export default projectRouter;