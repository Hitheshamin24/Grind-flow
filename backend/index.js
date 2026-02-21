const express = require("express");
require("dotenv").config();
const connect = require("./config/config");
const authMiddleware = require("./middleware/authMiddleware");
connect();
const app = express();

app.use(express.json());
console.log(typeof authMiddleware)

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

app.listen(5000, () => {
  console.log("Server is running on port " + 5000);
});
