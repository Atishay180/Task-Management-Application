import express from "express";
import { createTask, deleteTask, getAllTasks, updateTask } from "../controllers/task.controller.js";
import protectRoute from "../middlewares/protectRoute.middleware.js";

const router = express.Router();

router.post("/create", protectRoute, createTask);
router.post("/update/:id", protectRoute, updateTask);
router.post("/delete/:id", protectRoute, deleteTask);
router.get("/all", protectRoute, getAllTasks);

export default router;