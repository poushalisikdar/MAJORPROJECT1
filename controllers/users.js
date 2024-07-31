const User = require("../MODELS/user.js");
const { saveRedirectUrl } = require("../checklogmidle.js");

module.exports.signForm =  (req, res) => {
    res.render("user/signup.ejs");
};

module.exports.signup = async(req, res) => {
    try {
         let { email, username, password } = req.body;
         let newuser = new User({ email, username });
         let registuser = await User.register(newuser, password);
         // after sign in to login property
         req.login(registuser, (err) => {
              if (err) {
                   return next(err);
              }
              req.flash("success", "Welcome to Wanderlust!");
              res.redirect("/listings");
         });
    }
    catch (e) {
         req.flash("error", e.message);
         res.redirect("/signup");
    }
};

module.exports.loginForm = (req, res) => {
    res.render("user/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust");
    let currUrl = res.locals.currUrl || "/listings";
     res.redirect(currUrl);
};

module.exports.logout = async (req, res, next) => {
    req.logOut((err) => {
         if (err) {
              return next(err);
         }
         req.flash("success", "you are logged out");
         res.redirect("/listings");
    });

};