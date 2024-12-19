import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true, match: [/\b\w+@[\w.-]+\.\w{2,4}\b/gi, 'is invalid'],
    },
    password: {
        type: String,
        required: true,
    },
    // dwollaCustomerUrl: {
    //     type: String,
    //     required: true,
    // },
    // dwollaCustomerId: {
    //     type: String,
    //     required: true,
    // },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    postalCode: {
        type: Number,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    ssn: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'manager'],
        default: 'user',
        required: true,
    },
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema)
export default User;