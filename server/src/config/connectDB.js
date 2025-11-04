const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully connected to DB: ", connection.connection.host, connection.connection.name);
    } catch (err) {
        console.log("Failed to connect to DB", err);
        process.exit(1);
    }
}

module.exports = connectDB;