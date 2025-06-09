 import User from "../models/user.model.js";


 export const getUsers = async (req, res, next) => {
    try {
        
        // Fetch all users from the database
        const users = await User.find()
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: users
        });

    }

    catch (error) {
        next(error);
    }
 }


  export const getUser = async (req, res, next) => {
    try {
        
        // Fetch userById from the database
        const user = await User.findById(req.params.id).select('-password');

        // If user not found, throw an error
        if(!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            data: user
        });

    }

    catch (error) {
        next(error);
    }
 }