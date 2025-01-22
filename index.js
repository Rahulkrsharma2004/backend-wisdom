const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app;
