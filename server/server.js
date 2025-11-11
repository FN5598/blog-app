const express = require('express');
require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { swaggerUi, specs, swaggerOptions } = require('./src/config/swagger');
const connectDB = require('./src/config/connectDB');

console.log(`Loaded environment: ${process.env.NODE_ENV}`);

const app = express();
const PORT = 5000;
connectDB();

const allowedOrigins = process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : process.env.DEVELOPMENT_URL;

console.log('CLIENT_URL:', allowedOrigins);

app.use(cors({
    origin: allowedOrigins,
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
app.use("/api/users", require(path.join(__dirname, "src", "routes", "userRoutes")));

app.listen(PORT, () => {
    console.log("Server running on Port:", PORT);
})