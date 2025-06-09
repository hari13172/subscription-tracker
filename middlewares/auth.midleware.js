import jwt from 'jsonwebtoken';
import { jwt_secret } from "../config/env.js";
import User from '../models/user.model.js';


const authorization = async (req, res, next) => {
    try {

        let token;
        //the request header that splits the token from the header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) {
            return res.status(401).json({message: "Unauthorized access, no token provided"});
        }

        //verify the token
        const decoded = jwt.verify(token, jwt_secret)

        //attach the decoded user to the request object
        const user = await User.findById(decoded.userId)

        //user not exists
        if(!user) {
            return res.status(401).json({message: "Unauthorized access, user not found"});
        }
        req.user = user;
        next();
    }

    catch(error) {
        return res.status(401).json({message: "Unauthorized access", error: error.message });
    }
}

export default authorization;