const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectToDatabase = async () => {
  try {
    const uri =
      "mongodb+srv://anshugupta192541:UJXvqzdIlYneB5ZL@cluster0.zken3.mongodb.net/";
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = { connectToDatabase };
