const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./utils/db');
const authRoutes = require('./routes/Auth');
const cookieparser = require('cookie-parser');
const adminRoute = require('./routes/AdminRoutes');
dotenv.config();
db();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoute);
app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
