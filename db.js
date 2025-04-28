const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/BackEnd", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to the database successfully");
    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1); // Exit the process if the connection fails
    }
};

module.exports = connectDB;
