import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["To Do", "In Progress", "Completed"],
    },
    assignedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    priority: {
        type: String,
        required: true,
        enum: ["Low", "Medium", "High"]
    }
}, { timestamps: true });

export const Task = mongoose.model("Task", taskSchema);