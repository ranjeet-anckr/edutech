import { User } from "../../models/user.models.js";
import bcrypt from "bcrypt";

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
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      first_name: first_name.toLowerCase(),
      last_name: last_name.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      contact_no: contact_no.toLowerCase(),
      role: role.toLowerCase(),
      city: city.toLowerCase(),
    });

    const responseData = {
      ...newUser.toJSON(),
      first_name: toSentenceCase(newUser.first_name),
      last_name: toSentenceCase(newUser.last_name),
      city: toSentenceCase(newUser.city),
    };
    delete responseData.password;

    return res
      .status(201)
      .json({ data: responseData, message: "User successfully created" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createUser };
