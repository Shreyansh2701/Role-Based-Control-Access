const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// user registration
const register = async(req, res)=>{
    try {
        const {name, email, password} = req.body;
        const userexists = await UserModel.findOne({email});

        if(userexists){
            return res.status(400).send('User already exists');
        }
        
        // hash the password before saving it in the database
        const hashedPassword = await bcrypt.hashSync(password, 10);
        const user = new UserModel({name, email, password: hashedPassword});

        // save the user to the database 
        await user.save();

        res.status(200).json({success: true, message:"user registed successfully",user});
    }catch(e){
        res.status(500).json({success: false, message : e.message});
    }

}

// user login
const login = async(req, res)=>{
    try {
        const {email, password} = req.body;

        // check if user exists in the database
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).send('User not found');
        }

        // compare the hashed password with the provided password
        const isMatch = await bcrypt.compareSync(password, user.password);
        if(!isMatch){
            return res.status(400).send('Invalid password');
        }

        // generate JWT token for the authenticated user
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

        // set the token in the cookie for subsequent requests
        res.cookie('token', token, {
            httpOnly: true, 
            expires: new Date(Date.now() + 60 * 60 * 1000),
            secure: false
        }); 
        res.status(200).json({success: true, message: "LogIn Successfull", user: user, token});
    }catch(e){
        res.status(500).json({success: false, message : e.message});
    }
}

// user logout
const logout = (req, res)=>{
    try{
        res.clearCookie('token');
        res.status(200).json({success: true, message: "Logged Out Successfully"});
    } catch(e){
        res.status(500).json({success: false, message : e.message});
    }
}

const checkUser = (req, res)=>{
    try{
        try {
            const user=req.user
            if (!user) {
                res.status(404).json({message:'User not found'})
            }
            res.status(200).json(user)

            
        } catch (error) {
            res.status(500).json({message:"internal server error"})
            console.log(error)
            
        }
    } catch(e){
        res.status(500).json({message : e.message});
    }
}


module.exports = {register, login, logout, checkUser}