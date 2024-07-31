const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapasync = require("../utils/wrapasync.js");
const User = require("../MODELS/user.js")

const { isLoggedin, saveRedirect, isOwner,validateListing } = require("../checklogmidle.js");


const Usercontrollers = require("../controllers/users.js");

// signup form
router.get("/signup", Usercontrollers.signForm);


router.post("/signup", Usercontrollers.signup);

// login form 
router.get("/login", Usercontrollers.loginForm);

router.post("/login", saveRedirect, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true, }),
     Usercontrollers.login
);

router.get("/logout", Usercontrollers.logout);

module.exports = router;