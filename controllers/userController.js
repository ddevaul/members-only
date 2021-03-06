const User = require('../models/user');
const { body, validationResult } = require("express-validator");
const passport = require("passport");



exports.signup_get = (req, res) => {
  res.render("signup", {});
};

exports.login_get = (req, res) => {
  res.render("login", {});
};

exports.login_post = (req, res) => {
  passport.authenticate("local", {
    successRedirect: "/messages",
    failureRedirect: "/messages"
  })
}


exports.signup_post = [
  body("firstname", "Name required").trim().isLength({ min: 1 }).escape(),
  body("lastname", "Name required").trim().isLength({ min: 1 }).escape(),
  body("username", "username required").trim().isLength({ min: 1 }).escape(),
  body("password", "password required").trim().isLength({ min: 1 }).escape(),
  body("confirmation", "please confirm your password")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors)
      // There are errors. Render the form again with sanitized values/error messages.
      res.redirect("/users/signup");
      return;
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        const user = new User({
          first_name: req.body.firstname,
          last_name: req.body.lastname,
          username: req.body.username,
          password: hashedPassword,
        });
        // Data from form is valid.
        // Check if Genre with same name already exists.
        user.save(function (err) {
          if (err) {
            console.log(err);
            return next(err);
          }
          // Genre saved. Redirect to genre detail page.
          res.redirect("/messages");
        });
      });
    }
  },
];
