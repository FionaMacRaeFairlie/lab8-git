const guestbookDAO = require("../models/guestbookModel");
const db = new guestbookDAO("../entries.db");

const Users = require("../models/userModel");

exports.landingPage = function (req, res) {
  db.getAllEntries()
    .then((list) => {
      res.render("entries", {
        title: "Guest Book",
        user: req.cookies['username'],
        entries: list,
      });
      console.log("promise resolved");
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.newEntry = function (req, res) {
  res.render("newEntry", {
    title: "Guest Book",
    user: req.cookies['username'] 
  });
};

exports.showUserEntries = function (req, res) {
  console.log("filtering author name", req.params.author);
  let user = req.params.author;
  db.getEntriesByUser(user)
    .then((entries) => {
      res.render("entries", {
        title: "Guest Book",
        user: req.cookies['username'] ,
        entries: entries,
      });
    })
    .catch((err) => {
      console.log("error handling author posts", err);
    });
};

exports.jsonPage = function (req, res) {
  db.getAllEntries()
    .then((list) => {
      res.send(list);
      console.log(list);
      console.log("json endpoint set up");
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.showRegisterPage = function (req, res) {
  res.render("user/register");
};

exports.registerNewUser = async (req, res) =>{
  try {
    const user = await Users.findOne({ user: req.body.username });
    if (user) {
      res.status(400).send({"User already exits": user.user });
      return;
    }

     Users.add(req.body.username, req.body.pass);
     res.render( "user/login")
  }
   catch (err) {
    console.log(err);
  }
};

exports.showLoginPage = function (req, res) {
  res.render("user/login");
};

exports.notLoggedIn = function (req, res) {
  res.render("user/notLoggedIn");
};

exports.postNewEntry = function (req, res) {
  console.log("processing post-new_entry controller");
  if (!req.body.author) {
    res.status(400).send("Entries must have an author.");
    return;
  }
  db.addEntry(req.body.author, req.body.subject, req.body.contents);
  res.redirect("/")
};

exports.handleLogin = function (req, res) {
  res.render("newEntry", {
    title: "Guest Book",
    user:req.cookies['username'],
  });
};


