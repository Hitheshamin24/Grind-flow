const express = require("express");
require("dotenv").config();
const connect = require("./config/config");
const authMiddleware = require("./middleware/authMiddleware");
const cors = require("cors");

const app = express();
connect();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);


app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/", userRoutes);
app.use("/api/tasks", taskRoutes);
app.listen(5000, () => {
  console.log("Server is running on port " + 5000);
});
