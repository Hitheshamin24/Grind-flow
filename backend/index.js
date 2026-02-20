const express = require("express");
require("dotenv").config();
const connect = require("./config/config");
connect();
const app = express();

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

app.listen(5000, () => {
  console.log("Server is running on port " + 5000);
});
