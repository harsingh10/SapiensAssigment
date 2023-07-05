const userSchema = require("../Schema/schema");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../Schema/schema");

exports.initiateUser = async (req, res, next) => {
  try {
    console.log(req.body);
    let hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    let result = await user.save();
    console.log(result);
    if (result) {
      res.status(201).json({
        message: "User created!",
        result: result,
      });
    }
  } catch (err) {
    console.log(`Not able to create the user:${err}`);
    res.status(500).json({
      message: "Invalid authentication credentials!",
    });
  }
};

exports.loginUser = async (req, res, next) => {
  let fetchedUser;
  try {
    fetchedUser = await User.find({ email: req.body.email });
    if (!fetchedUser) {
      return res.status(401).json({
        message: "Auth Failed",
      });
    }
    console.log("fetchedUser=>", fetchedUser[0]._doc.password);
    bcrypt.compareSync(
      req.body.password,
      fetchedUser[0]._doc.password,
      (result) => {
        console.log(result);
        if (!result) {
          return res.status(401).json({
            message: "Auth Failed",
          });
        }
      }
    );
    let token = jwt.sign(
      { email: fetchedUser[0].email, userId: fetchedUser[0]._id },
      "secretKey",
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser[0]._id,
      theme: fetchedUser[0].theme,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "Invalid authentication credentials!",
    });
  }
};

exports.setTheme = async (req, res, next) => {
  try {
    const { email, userId } = res.locals.userData;
    const query = { email: email };
    const body = JSON.parse(req.body.body);
    // console.log("req.body.body", req.body.body);
    // console.log("req.body.body", JSON.parse(req.body.body));
    const data = { theme: body.theme };
    // console.log("query==>", query);
    // console.log("data==>", data);
    let response = await User.findOneAndUpdate(query, data, { upsert: false });
    if (response) res.status(200).json("Succesfully saved.");
  } catch (err) {
    if (err) return res.status(500).json({ error: err });
  }
};

exports.getProfile = (req, res, next) => {
  const { userId, email } = res.locals.userData;
  User.findById(userId)
    .then((user) => {
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ message: "User not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Fetching user failed!",
      });
    });
};
