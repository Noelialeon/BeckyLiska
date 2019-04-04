const express = require("express");
const authRoutes = express.Router();

const passport = require("passport");

const User = require("../models/user-model");
const Collection = require("../models/collection-model");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// authRoutes.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/home",
//     failureRedirect: "/",
//     failureFlash: true,
//     passReqToCallback: true
//   })
// );


authRoutes.post("/signup", (req, res, next) => {
  // const email = req.body.email;
  // const password = req.body.password;
  // const name = req.body.name;
  const { email, password, name } = req.body

  if (!email || !password) {
    res.status(400).json({ message: "Indicate username and password" })
    return
  }
  User.findOne({ email })
    .then(userDoc => {
      if (userDoc !== null) {
        res.status(409).json({ message: "The username already exists" })
        return
      }
      const salt = bcrypt.genSaltSync(bcryptSalt)
      const hashPass = bcrypt.hashSync(password, salt)
      const newCollection = new Collection({ title: "Favourites" }).save().then((collection) => {
        const newUser = new User({ email, password: hashPass, name, collections: [collection._id] })
        return newUser.save()
      })
      return newCollection
    })
    .then(userSaved => {
      // LOG IN THIS USER
      // "req.logIn()" is a Passport method that calls "serializeUser()"
      // (that saves the USER ID in the session)
      req.logIn(userSaved, () => {
        // hide "encryptedPassword" before sending the JSON (it's a security risk)
        userSaved.password = undefined;
        res.json(userSaved);
      });
    })
    .catch(err => next(err))
})


authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong authenticating user' });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Session save went bad.' });
        return;
      }
      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);

    });
  })(req, res, next);
});


authRoutes.get('/loggedin', (req, res, next) => {
  console.log("req.mir", req)
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

//logout
authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.json({ message: 'You are out!' })
});

// //profile page
// app.get("/profile", isLoggedIn, function(req, res) {
//   var user = req.user;
//   user._id = encrypt(user._id);
//   res.render("profile.hbs", {
//     user: user
//   });
// });

module.exports = authRoutes;
