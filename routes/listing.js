const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/wrapasync.js");
const { isLoggedin, isOwner, validateListing } = require("../checklogmidle.js");
const controllers = require("../controllers/listings.js");

const multer = require('multer')
const { storage } = require("../CloudConfig.js")

const upload = multer({ storage });




//index route
router.get("/", asyncWrap(controllers.index));




// new listing route
router.get("/new", isLoggedin, asyncWrap(controllers.newForm));

// show route or read route


router.get("/:id", asyncWrap(controllers.showRoute));

// create route


router.post("/", isLoggedin,
    upload.single("listing[image]"),
    validateListing,
    asyncWrap(controllers.createRoute)
);


// edit route
router.post("/:id/edit", isLoggedin, isOwner, asyncWrap(controllers.editRoute)
);


// updated route
router.put("/:id", isLoggedin, isOwner, upload.single("listing[image]"), validateListing, asyncWrap(controllers.updateRoute));

// deleted route for listings
// if this delete listings is called then mongoose middle ware also called
router.delete("/:id", isLoggedin, isOwner, asyncWrap(controllers.deleteRoute));

module.exports = router;