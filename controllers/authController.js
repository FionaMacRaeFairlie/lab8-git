const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Users = require("../models/userModel");

exports.login = async (req, res) => {
  try {
    const user = await Users.findOne({ user: req.body.username });

    if (!user) return res.send("no user"); //res.redirect('/login');

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err || !result) return res.send("problem password"); //res.redirect('/login');

      const token = jwt.sign({ user: user.user }, process.env.SECRET, {
        expiresIn: "1800s", // 30 minutes
      });
      res.cookie("username", user.user);
      res.cookie("jwt", token).redirect("/new");
    });
  } catch (err) {
    console.log(err);
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.clearCookie("username");
  res.redirect("/");
};
