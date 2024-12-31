import User from "../models/authSchema.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json({ users, message: "Users Fetched!" });
    } catch (error) {
        console.error("Error in fetch user : ", err.message);
        res.status(501).json({ error: "INTERNAL SERVER ERROR" })
    }
}