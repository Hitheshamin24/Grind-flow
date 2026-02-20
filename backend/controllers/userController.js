const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email, name });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already Exists" });
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({ success: true, user });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const {id}=req.params
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "user deleted Succesfully" });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, users });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
