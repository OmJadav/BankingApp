import User from "../models/authSchema.js";
import generateToken from "../utils/generateToken.js";

export const signupUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, address, city, postalCode, dateOfBirth, ssn } = req.body;

        if (!firstName || !lastName || !email || !password || !address || !city || !postalCode || !dateOfBirth || !ssn) {
            return res.status(400).json({ error: "Please fill required fields!" })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: "User Already Exists!" })
        }
        const newUser = new User({ firstName, lastName, email, password, address, city, postalCode, dateOfBirth, ssn })
        const createdUser = await newUser.save();

        if (createdUser) {
            return res.status(201).json({ message: "User registered successfully!" })
        } else {
            res.status(400).json({ error: "Invalid signup user data !" })
        }
    } catch (err) {
        console.error("Error in signup ::", err.message);
        res.status(501).json({ error: "Signup Failed!" });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: "User not found!" })
        }
        if (user && (await user.matchPassword(password))) {
            generateToken(res, user._id);
            return res.status(201).json({ _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, message: "User Authorized" })
        } else {
            return res.status(400).json({ error: "Invalid credentials!" })
        }
    } catch (err) {
        console.error("Error in login", err.message);
        res.status(501).json({ error: "Login Failed!" })
    }
}

export const logoutUser = async (req, res, next) => {
    try {
        res.cookie('jwt', '', { httpOnly: true, sameSite: 'None', secure: process.env.NODE_ENV === 'production', expires: new Date(0) });
        res.status(200).json({ message: "User Logged Out" })
    } catch (err) {
        console.error("Error in logout ::", err.message);
        res.status(501).json({ error: "Logout Failed!" })
    }
}