const userModel = require('../models/userModel');

const getUser = async(req, res)=> {
    try {
        const users = await userModel.find();
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({message: error.message});    
    }
}

const deleteUser = async(req, res)=> {
    try {
        const userId = req.params.id;
        const checkAdminUser = await userModel.findById(userId);

        if(checkAdminUser.role === 'admin'){
            return res.status(403).json({message: 'Cannot delete yorself id'}); 
        }
        
        const user = await userModel.findByIdAndDelete(userId);
        if(!user) return res.status(404).json({message: 'User not found'});
        res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});    
    }
}

module.exports = {getUser, deleteUser}

