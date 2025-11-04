const express = require('express');
require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/config/connectDB');
const cors = require('cors');

const app = express();
const PORT = 5000;
connectDB();


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", require(path.join(__dirname, "src", "routes", "userRoutes")));
app.use("/api/auth", require(path.join(__dirname, "src", "routes", "authRoutes.js")));

app.listen(PORT, () => {
    console.log("Server running on Port:", PORT);
})