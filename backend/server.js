import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectMongoDB from "./db/connectMongoDB.js";

import authRoute from "./routes/auth.route.js";
import taskRoute from "./routes/task.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("API is running...");
})

app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
    connectMongoDB();
})
