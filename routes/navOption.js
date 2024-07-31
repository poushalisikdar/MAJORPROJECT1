const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/wrapasync.js");

const controllers = require("../controllers/navOptions.js");





router.get("/mountain", asyncWrap(controllers.mountain));
router.get("/beach", asyncWrap(controllers.beach));
router.get("/pool", asyncWrap(controllers.pool));
router.get("/tent", asyncWrap(controllers.tent));
router.get("/room", asyncWrap(controllers.room));
router.get("/villa", asyncWrap(controllers.villa));
router.get("/igloo", asyncWrap(controllers.mountain));
router.get("/boutiquehotel", asyncWrap(controllers.boutiquehotel));
router.get("/country", asyncWrap(controllers.country));

module.exports = router;