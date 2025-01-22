const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const cookieParser = require("cookie-parser");
const swaggerSpec = require("./config/swagger");
const path = require("path"); // Import the path module

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

// Serve Swagger UI assets
app.use('/api-docs', express.static(path.join(__dirname, 'node_modules/swagger-ui-dist')));
app.get('/api-docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'node_modules/swagger-ui-dist/index.html'));
});

// Provide Swagger JSON
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);

app.use("/", (req, res) => {
  res.send("Welcome To Customer Service Home Page !");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});

module.exports = app;
