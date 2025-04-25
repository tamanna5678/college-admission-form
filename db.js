const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/BackEnd", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(console.log("Connected database")).catch((err=>{
            console.log("Error In Connection");
        }))
    } catch (error) {
        console.error(" Database Connection Error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
