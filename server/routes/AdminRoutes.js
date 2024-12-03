const express = require('express');
const { getUser, deleteUser } = require('../controllers/AdminController');
const {isAdmin} = require('../middleware/verifyToken');

const adminRoute = express.Router();

adminRoute.get('/getuser',isAdmin, getUser);
adminRoute.delete('/delete/:id',isAdmin, deleteUser);

module.exports = adminRoute;