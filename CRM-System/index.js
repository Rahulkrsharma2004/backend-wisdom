const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const cookieParser = require("cookie-parser");
const swagger = require("./config/swagger");

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//     secure: false, 
// }))

app.use(cors({origin: ["https://backend-wisdom-puce.vercel.app"],
    credentials: true,
  })
);

app.use("/api-docs", swagger.serve, swagger.setup);
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
