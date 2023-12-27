import { User } from "../../models/user/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const toSentenceCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const handleServerError = (res, error) => {
  console.error("Error:", error);
  return res.status(500).json({ error: "Internal Server Error" });
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
      contact_no,
      role: "student",
      city: city.toLowerCase(),
    });

    const responseData = {
      id: newUser.id,
      first_name: toSentenceCase(newUser.first_name),
      last_name: toSentenceCase(newUser.last_name),
      city: toSentenceCase(newUser.city),
      email: newUser.email,
      role: newUser.role,
      contact_no: newUser.contact_no,
    };
    const token = jwt.sign(newUser.toJSON(), secretKey, { expiresIn: "8h" });

    return res.status(201).json({
      data: { ...responseData, token },
      message: "Account created",
    });
  } catch (error) {
    return handleServerError(res, error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email: email.toLowerCase() },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const responseData = {
      id: user.id,
      email: user.email,
      first_name: toSentenceCase(user.first_name),
      last_name: toSentenceCase(user.last_name),
      city: toSentenceCase(user.city),
      role: user.role,
    };

    const token = jwt.sign(responseData, secretKey, { expiresIn: "8h" });

    return res.status(200).json({
      data: { ...responseData, token },
      message: "Login successful",
    });
  } catch (error) {
    return handleServerError(res, error);
  }
};

const getProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const [, token] = authHeader.split(" ");
      jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
          res.status(401).json({ error: "Token verification failed" });
        } else {
          const userId = decoded.id;
          const user = await User.findByPk(userId);
          const responseData = {
            email: user.email,
            first_name: toSentenceCase(user.first_name),
            last_name: toSentenceCase(user.last_name),
            city: toSentenceCase(user.city),
            role: user.role,
          };

          if (user) {
            res.status(200).json({ data: responseData });
          } else {
            res.status(404).json({ error: "User not found" });
          }
        }
      });
    } else {
      res.status(401).json({ error: "Authorization header is missing" });
    }
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createUser, loginUser, getProfile };
