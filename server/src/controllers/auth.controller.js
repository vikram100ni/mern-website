import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    if (!username || !email || !phone || !password) {
      return res.status(501).json({ message: "All field are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exist" });
    }
    const user = await User.create({
      username,
      email,
      phone,
      password,
    });
    res.status(201).json({
      message: "User registered successfully",
      token: await user.genrateToken(),
      userId: user._id.toString(),
    });
  } catch (error) {
    //console.log("found error", error.message);
    res.status(400).send({ error });
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(501).json({ message: "user not found" });
    }
    const isComparedPassword = await user.comparePassword(password);

    if (!isComparedPassword) {
      return res.status(401).json({ message: "invalid crediantial" });
    }

    res.status(201).json({
      message: "login successfully",
      token: await user.genrateToken(),
      userId: user._id.toString(),
    });
  } catch (error) {
    //res.status(500).json({ message: "internal server error" });
    next();
  }
};

export default { register, login };
