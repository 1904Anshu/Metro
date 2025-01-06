const mongoose = require("mongoose");
const connectDB = async () => {
  const MONGO_URI =
    "mongodb+srv://rajuchutkibheemkalia:rajuchutkibheemkalia@cluster0.f2eab.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
