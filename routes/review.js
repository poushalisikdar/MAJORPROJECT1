const express = require("express");
const router = express.Router({mergeParams:true});

const asyncWrap = require("../utils/wrapasync.js");
const { validateReview, isLoggedin, isReviewAuthor}  = require("../checklogmidle.js");
const Reviewcontrollers= require("../controllers/reviews.js");


// reviews deleted route
router.delete("/:reviewId",  isLoggedin,isReviewAuthor,asyncWrap(Reviewcontrollers.destroyReview));



// post route for reviews created
router.post("/", isLoggedin, validateReview, asyncWrap(Reviewcontrollers.createReview));

module.exports = router;