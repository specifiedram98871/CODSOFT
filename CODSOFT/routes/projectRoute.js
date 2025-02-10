import { Router } from "express";
import { addProject ,assignTask,editProject,deleteProject,projectList,assignProject} from "../controller/projectController.js";
import {authenticate} from "../middleware/authorize.js";
import checkAdmin from "../middleware/checkAdmin.js";
const projectRouter = Router();

projectRouter.post("/addproject", addProject);
projectRouter.post("/assignTask/:project_id/:subtask_id", assignTask);
projectRouter.post("/edit/:project_id", editProject);
projectRouter.delete("/delete/:project_id", authenticate, checkAdmin, deleteProject);
projectRouter.get("/projectList", authenticate,projectList);
projectRouter.post("/assign/:project_id",assignProject)
export default projectRouter;