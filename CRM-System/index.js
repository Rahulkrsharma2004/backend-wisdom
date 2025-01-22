const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const cookieParser = require('cookie-parser');

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());
app.use(cookieParser())

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

app.use('/',(req,res)=>{
    res.send("Welcome To Customer Service Home Page !")
})
app.listen(PORT, () => console.log(`Server is running  port ${PORT}`));

module.exports = app;
