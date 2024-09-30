import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";


const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, assignedUsers, priority } = req.body;

        if (!title || !description || !dueDate || !priority) {
            return res
                .status(400)
                .json({ error: "Please fill all the fields" })
        }

        const status = 'To Do'  

        const taskExists = await Task.findOne({ title });

        if (taskExists) {
            return res
                .status(400)
                .json({ message: "Task already exists" })
        }

        const task = new Task({
            title,
            description,
            dueDate: new Date(dueDate),
            status,
            assignedUsers: assignedUsers || [],
            priority
        });

        await task.save();

        // Add task to admin user
        const addTaskToAdmin = await User.updateOne(
            { _id: req.user._id },
            { $push: { myTasks: task._id } });

        if (!addTaskToAdmin) {
            return res
                .status(400)
                .json({ message: "Task not created" })
        }

        // Add task to assigned users
        if (assignedUsers && assignedUsers.length > 0) {
            await User.updateMany(
                { _id: { $in: assignedUsers } },
                { $push: { assignedTasks: task._id } } 
            );
        }

        return res
            .status(201)
            .json({
                _id: task._id,
                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
                status: task.status,
                assignedUsers: task.assignedUsers,
                priority: task.priority
            });

    } catch (error) {
        console.log("Error in createTask controller: ", error.message)
        return res
            .status(500)
            .json({ message: "Internal Server Error" })
    }
};

const updateTask = async (req, res) => {
    try {
        const { title, description, dueDate, status, priority } = req.body;
        const taskId = req.params.id;
        const userId = req.user._id;

        if (!taskId) {
            return res
                .status(400)
                .json({ message: "Task ID is required" })
        }

        const user = await User.findById(userId);

        if (!user.myTasks.includes(taskId)) {
            return res
                .status(400)
                .json({ message: "You cannot edit the task since you are not admin of this task" })
        }

        const updatedTask = {};

        if (title) {
            const isExists = await Task.findOne({ title });

            if (isExists) {
                return res
                    .status(400)
                    .json({ message: "Title must be unique" })
            }

            updatedTask.title = title;
        }

        if (description) updatedTask.description = description;
        if (dueDate) updatedTask.dueDate = new Date(dueDate);
        if (status) updatedTask.status = status;
        if (priority) updatedTask.priority = priority;

        const task = await Task.findByIdAndUpdate(
            taskId,
            { $set: updatedTask },
            { new: true }
        )

        if (!task) {
            return res
                .status(400)
                .json({ message: "Task not updated" })
        }

        return res
            .status(200)
            .json({ message: "Task updated successfully" });

    } catch (error) {
        console.log("Error in updateTask controller: ", error.message)
        return res
            .status(500)
            .json({ message: "Internal Server Error" })
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.user._id;

        if (!taskId) {
            return res
                .status(400)
                .json({ message: "Task ID is required" })
        }

        const user = await User.findById(userId);

        if (!user.myTasks.includes(taskId)) {
            return res
                .status(400)
                .json({ message: "You cannot delete the task since you are not admin of this task" })
        }

        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
            return res
                .status(400)
                .json({ message: "Task not deleted" })
        }

        // Remove task from admin user
        const removeTaskFromAdmin = await User.updateOne(
            { _id: userId },
            { $pull: { myTasks: taskId } });

        if (!removeTaskFromAdmin) {
            return res
                .status(400)
                .json({ message: "Task not deleted" })
        }

        // Remove task from assigned users
        await User.updateMany(
            { _id: { $in: task.assignedUsers } }, // Update all users who are assigned to this task
            { $pull: { assignedTasks: taskId } } // Pull the task from their 'assignedTasks' array
        );

        return res
            .status(200)
            .json({ message: "Task deleted successfully" });

    } catch (error) {
        console.log("Error in deleteTask controller: ", error.message)
        return res
            .status(500)
            .json({ message: "Internal Server Error" })
    }
};

const getAllTasks = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        const tasks = await Task.find({
            $or: [
                { _id: { $in: user.myTasks } },
                { _id: { $in: user.assignedTasks } }
            ]
        });

        if (!tasks) {
            return res
                .status(400)
                .json({ message: "No tasks found" })
        }

        return res
            .status(200)
            .json({ tasks });

    } catch (error) {
        console.log("Error in getAllTasks controller: ", error.message);
        return res
            .status(500)
            .json({ message: "Internal Server Error" });
    }
};

const filterTasks = async (req, res) => {
    try {
        const selectedFilter = req.body.selectedFilter;
        const userId = req.user._id;

        const user = await User.findById(userId);

        let tasks = [];

        if (selectedFilter === "All") {
            tasks = await Task.find({
                $or: [
                    { _id: { $in: user.myTasks } },
                    { _id: { $in: user.assignedTasks } }
                ]
            }).populate("assignedUsers", "fullName email");
        }

        // Filter by priority
        else if (["High", "Medium", "Low"].includes(selectedFilter)) {
            tasks = await Task.find({
                $or: [
                    { _id: { $in: user.myTasks } },
                    { _id: { $in: user.assignedTasks } }
                ],
                priority: selectedFilter
            }).populate("assignedUsers", "fullName email");
        }
        // Filter by status
        else if (["To Do", "In Progress", "Completed"].includes(selectedFilter)) {
            tasks = await Task.find({
                $or: [
                    { _id: { $in: user.myTasks } },
                    { _id: { $in: user.assignedTasks } }
                ],
                status: selectedFilter
            }).populate("assignedUsers", "fullName email");
        }

        else {
            return res
                .status(400)
                .json({ message: "Task Not found" });
        }

        return res
            .status(200)
            .json({ tasks });
    } catch (error) {
        console.log("Error in filterTasks controller: ", error.message);
        return res
            .status(500)
            .json({ message: "Internal Server Error" });
    }
};


export { createTask, updateTask, deleteTask, getAllTasks, filterTasks };