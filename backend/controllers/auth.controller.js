import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";

const register = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;
        if (!fullName || !email || !password) {
            return res
                .status(400)
                .json({ message: "Please fill all the fields" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res
                .status(400)
                .json({ message: "Invalid email format" })
        }

        if (password !== confirmPassword) {
            return res
                .status(400)
                .json({ message: "Password do not match" })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res
                .status(400)
                .json({ message: "User already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            return res
                .status(201)
                .json({
                    _id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email,
                })
        }
        else {
            return res
                .status(400)
                .json({ message: "Invalid user data" })
        }

    } catch (error) {
        console.log("Error in register controller: ", error.message)
        return res
            .status(500)
            .json({ error: "Internal Server Error" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Please fill all the fields" })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .json({ message: "User does not exist" })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res
                .status(400)
                .json({ message: "Invalid email or password" })
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            myTasks: user.myTasks,
            assignedTasks: user.assignedTasks
        })

    } catch (error) {
        console.log("Error in login controller: ", error.message)
        return res
            .status(500)
            .json({ error: "Internal Server Error" })
    }
}

const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });    // ("name of cookie", "value", "options")
        return res
            .status(200)
            .json({ message: "Logged out successfully" })

    } catch (error) {
        console.log("Error in logout controller: ", error.message)
        return res
            .status(500)
            .json({ error: "Internal Server Error" })
    }
}

export { register, login, logout };