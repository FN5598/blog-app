const express = require('express');
require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/config/connectDB');
const cors = require('cors');
const { swaggerUi, specs, swaggerOptions } = require('./src/config/swagger');

const app = express();
const PORT = 5000;
connectDB();

const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://localhost:5173',
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

console.log("Swagger specs generated:", !!specs);
console.log("OpenAPI version:", specs?.openapi)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerOptions));

app.use("/api/auth", require(path.join(__dirname, "src", "routes", "authRoutes")));
app.use('/api/posts', require(path.join(__dirname, 'src', 'routes', 'postRoutes')));
app.use("/api/post", require(path.join(__dirname, "src", "routes", "commentRoutes")));

app.listen(PORT, () => {
    console.log("Server running on Port:", PORT);
})