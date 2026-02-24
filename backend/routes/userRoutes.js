const express = require("express");
const router = express.Router();
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  LoginUser
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/auth/register", createUser);
router.get("/:id", authMiddleware, getUser);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);
router.get("/",authMiddleware,getAllUsers);
router.post("/auth/login",LoginUser)
module.exports = router;