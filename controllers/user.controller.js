import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import crypto from "crypto";

dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    const hashpassword = await bcrypt.hash(password, 10);
    if (existingUser) {
      res.status(404).json({ message: "user already exists" });
    }

    if (password.length > 6) {
      const newUser = new User({
        name,
        email,
        password: hashpassword,
      });
      await newUser.save();
      res.status(200).json(newUser);
    } else {
      res
        .status(404)
        .json({ messsage: "password length must be greater then 6" });
    }
  } catch (error) {
    res.status(500).json({ message: "connection error" });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!User) {
      res.status(404).json({ message: "user not exists" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "password not matched" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, password: user.password },
      secretKey,
      { expiresIn: "1hr" }
    );
    res.status(200).json({ data: user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all users

export const getAllUsers = async (req, res) => {
  try {
    const Users = await User.find();
    if (!Users) {
      return res.status(404).json({ message: " user not found" });
    }
    res.status(200).json(Users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single user controllers
export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const singleUser = await User.findById(id);
    if (!singleUser) {
      return res.status(404).json({ messsage: "user not found" });
    }
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!user) {
      return req.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete user
export const deleteSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// forget password
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "sobii1107@gmail.com",
          pass: "nxfg ldxt fvzi ufbc",
        },
      });

      const otp = crypto.randomBytes(3).toString("hex");

      // Log email and OTP for debugging
      console.log("Email:", email);
      console.log("Generated OTP:", otp);

      const otpDocument = new Otp({
        email,
        otp,
      });

      await otpDocument.save();

      const mailOptions = {
        from: "sobii1107@gmail.com",
        to: email,
        subject: "password reset Otp",
        text: `your Otp is ${otp}`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "OTP sent successfully", user });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// reset password
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    console.log(otp);

    const otpVerify = await Otp.findOne({ email, otp: otp.trim() });

    if (!otpVerify) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    console.log("New Password:", password);
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    await User.updateOne({ email }, { $set: { password: hashPassword } });

    await Otp.deleteOne({ email });
    res.status(200).json({ message: "Password changed successfully", password });
  } catch (error) {
    res
      .status(501)
      .json({ message: error.message, another: "hwllooshdgfagdg" });
  }
};
