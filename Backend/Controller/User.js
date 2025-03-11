const userDetails = require("../Model/User.model");
const bcrypt = require("bcrypt");
const log = require("../Model/Log.model")
const jwt = require('jsonwebtoken');
require('dotenv').config();


// register
const registerUser = async (req, res) => {
  const { Name,Email, Password, Role } = req.body;
  console.log(Email);
  console.log(Password);
  console.log(Role);
  const hashedPassword = await bcrypt.hash(Password, 10);
  const user = await userDetails.findOne({ Email });
  if (user) {
    return res.json({ msg: "User already exists" });
  }
  else {
    const creat = await userDetails.create({
      Name,
      Email,
      Password: hashedPassword,
      Role: Role
    });
    try {
      await log.create({
        action: "Registered",
        entityType: "User",
        entityId: creat._id,
        timestamp: Date.now(),
        details: "User Registered"
      })
      console.log("success log")
    } catch (err) {
      console.log(err);
    }
    return res
      .json({ msg: "User created successfully", data: creat });
  }

}

//Login

const loginUser = async (req, res) => {

  const { Email, Password } = req.body;
  const user = await userDetails.findOne({ Email });
  if (!user) {
    return res.json({ msg: "User not found Please Register !!" });
  }

  const paswd = user.Password;
  const match = await bcrypt.compare(Password, paswd);

  if (!match) {
    return res.json({ msg: "Invalid Details" });
  }

  //jwt auth

  const token = jwt.sign(  { id: user._id, email: user.email, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });

  try {
    await log.create({
      action: "LoggedIn",
      entityType: "User",
      entityId: user._id,
      timestamp: Date.now(),
      details: "User LoggedIn"

    })
  } catch (err) {
    console.log(err);
  }
  return res.json({ msg: "LoginSuccess", Role: user.Role });
}

module.exports = { registerUser, loginUser };