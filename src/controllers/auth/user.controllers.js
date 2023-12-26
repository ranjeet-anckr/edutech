import { User } from "../../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.SECRET_KEY;
const toSentenceCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, contact_no, city, role } =
      req.body;

    const existingUser = await User.findOne({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      first_name: first_name.toLowerCase(),
      last_name: last_name.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      contact_no: contact_no,
      role: "student",
      city: city.toLowerCase(),
    });

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      secretKey,
      { expiresIn: "8h" }
    );

    const responseData = {
      first_name: toSentenceCase(newUser.first_name),
      last_name: toSentenceCase(newUser.last_name),
      city: toSentenceCase(newUser.city),
      email: newUser.email,
      role: newUser.role,
      contact_no: newUser.contact_no,
    };

    return res.status(201).json({
      data: { ...responseData, token },
      message: "User successfully created",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, {
      expiresIn: "8h",
    });

    const responseData = {
      email: user.email,
      first_name: toSentenceCase(user.first_name),
      last_name: toSentenceCase(user.last_name),
      city: toSentenceCase(user.city),
      role: user.role,
    };

    return res.status(200).json({
      data: { ...responseData, token },
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createUser, loginUser };
