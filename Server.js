// const express = require("express");
// const dotenv = require("dotenv");
// const run = require("./config/db");
// const adminRoutes = require("./admin/Routes/adminRoutes");
// const clientRoutes = require("./client/Routes/cleintRoutes");
// const cors = require("cors");

// dotenv.config();
// // connectDB();
// run().catch(console.dir);

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.use("/api/admin", adminRoutes);
// app.use("/api/client", clientRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const dotenv = require("dotenv");
const run = require("./config/db");
const adminRoutes = require("./admin/Routes/adminRoutes");
const clientRoutes = require("./client/Routes/cleintRoutes");
const cors = require("cors");
// Import the database connection function
const { connectToDatabase } = require("./config/db");

// Configure environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import and use routes

app.use("/api/admin", adminRoutes);
app.use("/api/client", clientRoutes);

// Connect to the database
connectToDatabase();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
