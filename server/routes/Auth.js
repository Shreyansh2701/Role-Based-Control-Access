const express = require('express');
const { register, login, logout, checkUser } = require('../controllers/AuthController');
const { isUser } = require('../middleware/verifyToken');

const authRoutes = express.Router();

authRoutes.post('/register',register)
authRoutes.post('/login',login)
authRoutes.post('/logout',logout)
authRoutes.get('/checkUser',isUser, checkUser)

module.exports = authRoutes;