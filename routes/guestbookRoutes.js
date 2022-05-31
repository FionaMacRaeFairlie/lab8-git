const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth = require('../controllers/authController');
const controller = require("../controllers/guestbookControllers");

router.get("/", controller.landingPage);

router.get("/new", controller.newEntry);

router.get("/posts/:author", controller.showUserEntries);

router.get("/json", controller.jsonPage);

router.get("/register", controller.showRegisterPage);
router.post("/register", controller.registerNewUser);

router.get("/login", controller.showLoginPage);
router.post("/login", auth.login);

router.get("/notLoggedIn", controller.notLoggedIn);

router.post("/new",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/notLoggedIn",
  }),
  controller.postNewEntry
);

router.get("/loggedIn",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/notLoggedIn",
  }),
  controller.handleLogin
);

router.get("/logout", auth.logout);

router.use(function(req, res) {
        res.status(404);
        res.type('text/plain');
        res.send('404 Not found.');
    });

router.use(function(err, req, res, next) {
        res.status(500);
        res.type('text/plain');
        res.send('Internal Server Error.');
    });

module.exports = router;
