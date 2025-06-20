import mongoose from "mongoose"
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwt_secret, jwt_expires_in } from "../config/env.js";


export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {name , email, password} = req.body;

        // Check if name, email, and password are provided
        if (!name || !email || !password) {
            const error = new Error("Name, email, and password are required");
            error.statusCode = 400;
            throw error;
        }

        //check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        //hash the Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        //create new user
        const newUser = await User.create([{
            name,
            email,
            password: hashedPassword
        }], { session });

        // jwt token generation
        const token = jwt.sign({ userId: newUser[0]._id }, jwt_secret, {expiresIn: jwt_expires_in});
        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUser[0]
            }
        });


    }

    catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    try{

        const {email, password} = req.body;
        
        // first need to find or filter the user by email
        const user = await User.findOne({email})

        // if user not found
        if(!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        // validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // if password is not valid
        if(!isPasswordValid) {
            const error = new Error("Invalid password");
            error.statusCode = 401;
            throw error;
        }

        // jwt token generation
        const token = jwt.sign({ userId: user._id }, jwt_secret, { expiresIn: jwt_expires_in });
        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                token,
                user
            }
        });
    }
    catch (error) {
        next(error);
    }
}