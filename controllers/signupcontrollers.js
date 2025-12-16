const User = require("./../models/userModel");
const signUser = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, password } = req.body;
    const newUser = new User({
      firstname,
      lastname,
      email,
      phone,
      password,
    });
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User signed up successfully", user: savedUser });

  } catch (error) {
    res.status(500).json({ 
        message: "Error signing up user", error: error.message
    });
  }
}