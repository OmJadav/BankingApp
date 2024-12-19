import User from "../models/authSchema.js";

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