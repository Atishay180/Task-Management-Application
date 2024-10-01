import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectMongoDB from "./db/connectMongoDB.js";

import authRoute from "./routes/auth.route.js";
import taskRoute from "./routes/task.route.js";

dotenv.config();

const app = express();

app.use(cors());

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("API is running...");
})

app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
    connectMongoDB();
})
