import express from "express";
import { createTask, deleteTask, filterTasks, getAllTasks, getTask, updateTask } from "../controllers/task.controller.js";
import protectRoute from "../middlewares/protectRoute.middleware.js";

const router = express.Router();

router.post("/create", protectRoute, createTask);
router.put("/update/:id", protectRoute, updateTask);
router.post("/delete/:id", protectRoute, deleteTask);
router.get("/all", protectRoute, getAllTasks);
router.post("/filter", protectRoute, filterTasks);
router.get("/:id", protectRoute, getTask);

export default router;