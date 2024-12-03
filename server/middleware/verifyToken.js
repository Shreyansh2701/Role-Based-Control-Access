const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const isAdmin = async(req, res, next)=>{
    const token = req.cookies.token;
    
    if(!token) return res.status(401).json({message: 'Unauthorized: No Token Provided'}); 
    try {
        // verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // getting the user
        const user = await userModel.findById(decoded.id);

        if(!user) return res.status(401).json({message: 'User not found'});

        // checking if user is admin
        if(user.role !== 'admin'){
            return res.status(403).json({message: 'User not an admin'});
        }
        req.user = user;

        next();

    } catch (error) {
        return false;
    }
}

const isUser = async(req, res, next) => {
    const token = req.cookies.token;
    
    if(!token) return res.status(401).json({message: 'Unauthorized: No Token Provided'}); 

    try {
        // verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // getting the user
        const user = await userModel.findById(decoded.id);

        if(!user) return res.status(401).json({message: 'User not found'});

        req.user = user;

        next();

    } catch (error) {
        return false;
    }
}

module.exports = {isAdmin, isUser};