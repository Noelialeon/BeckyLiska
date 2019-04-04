const express = require("express");
const router = express.Router();
const User = require('../models/user-model');
const Collection = require('../models/collection-model');
const passport = require("passport");

// http://localhost:5000/collections

router.get("/", (req, res, next) => {
  console.log("USER FROM COLLECTIONS", req.isAuthenticated(), req.user)

  if (req.isAuthenticated()) {
    User.findById(req.user._id).populate('collections').then(user => {
      console.log("populated user", user)
      return res.json(user)
    }).catch(error => {
      return res.status(403).json({ message: 'Unauthorized' })
    })
  }
});




// adding user collections 
router.post("/add-collection", (req, res, next) => {
  if (req.isAuthenticated()) {

    // create collection
    const collection = new Collection({ title: "Favourites" }).save().then((collection) => {
      return res.json(collection)
    }).catch(error => {
      return res.status(403).json({ message: "Some error with collections" })
    });
    // take _id of collection
    collection_id = req.collection._id

    // update user with $addtoset + _id of collection.
    User.findByIdAndUpdate(req.user._id, { $addToSet: { collections: [collection_id] } })
      .then(user => {
        return res.json(user)
      }).catch(error => {
        return res.status(403).json({ message: 'Unauthorized' })
      })
  }

  //trying this in index.js
  // router.post("/add-article", (req, res, next) => {
  //   if (req.isAuthenticated()) {
  //     Collection.update(
  //       { _id: req.collection._id },
  //       { $addToSet: { items: req.body.eventId } }
  //     ).then(x => {
  //       console.log("xxxxxxxxxxxxx", x);
  //     });
  //     res.send("up and running");
  //   }
  // });
})


router.get("/user/collections", (req, res, next) => {
  console.log("req.isAuthenticated", req.isAuthenticated())

  console.log(req.user, req.isAuthenticated())
  if (req.isAuthenticated()) {
    User.findById(req.user._id).populate('collections').then(user => {
      return res.json(user)
    }).catch(error => {
      return res.status(403).json({ message: 'Unauthorized' })
    })
    // res.json([
    //   { name: "ruby", articles: [123, 234, 345] }
    // ])
    // res.json(req.user.collections)
  }
});

module.exports = router;
