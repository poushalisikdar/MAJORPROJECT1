
if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
require('dotenv').config();

const Listing = require("./MODELS/listings.js");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const LocalStrategy = require("passport-local");
const Passport = require("passport");
const User = require("./MODELS/user.js");

const dbUrl = process.env.ATLASDB_URL;

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: "mysupersecretcode"
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("Error in mongo session store", err);
});


const sessionOption = {
    store: store,
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    },

};


// mongo session
// const store = MongoStore.create({
//     mongoUrl: dbUrl,
//     crypto:{
//         secret:"mysupersecretcode"
//     },
//     touchAfter: 24*3600,
// });

app.use(session(sessionOption));
app.use(flash());
app.use(Passport.initialize());
app.use(Passport.session());
Passport.use(new LocalStrategy(User.authenticate()));


Passport.serializeUser(User.serializeUser());
Passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


const listings = require("./routes/listing.js")
const reviews = require("./routes/review.js");
const user = require("./routes/user.js");
const navOptions = require("./routes/navOption.js");

// middleware to parse json bodies
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public"))); // public folder


app.listen(8080, () => {
    console.log("server is listening: ");
});

main()// function call
    .then(() => {
        console.log("connection succesful");
    })
    .catch((err) => {
        console.log(err)
    });

async function main() {
    await mongoose.connect(dbUrl);
};


//:) start code from here//

app.use("/listings", listings);// listings is require from routes folder
app.use("/listings/:id/reviews", reviews);
app.use("/", user);
app.use("/", navOptions);

// app.get("/mountain", async (req, res) => {
//     const listings = await Listing.find({ category:"Mountain" });
//     res.render("navOptions/mountain.ejs", { listings });
// });
// app.get("/boutiquehotel", async (req, res) => {
//     const listings = await Listing.find({ category:"Boutique Hotel" });
//     res.render("navOptions/boutiquehotel.ejs", { listings });
// });
// app.get("/villa", async (req, res) => {
//     const listings = await Listing.find({ category:"Villa" });
//     res.render("navOptions/villa.ejs", { listings });
// });
// app.get("/room", async (req, res) => {
//     const listings = await Listing.find({ category:"Room" });
//     res.render("navOptions/room.ejs", { listings });
// });
// app.get("/igloo", async (req, res) => {
//     const listings = await Listing.find({ category:"Igloo" });
//     res.render("navOptions/igloo.ejs", { listings });
// });
// app.get("/pool", async (req, res) => {
//     const listings = await Listing.find({ category:"Pool" });
//     res.render("navOptions/pool.ejs", { listings });
// });
// app.get("/tent", async (req, res) => {
//     const listings = await Listing.find({ category:"Tent" });
//     res.render("navOptions/tent.ejs", { listings });
// });
// app.get("/beach", async (req, res) => {
//     const listings = await Listing.find({ category:"Beach" });
//     res.render("navOptions/beach.ejs", { listings });
// });

// app.get("/country",async(req,res)=>{
//     const countryName = req.query.listing?.country; // Extract the country name from the nested 'listing' object
//         const listing = await Listing.find({ country: countryName });
//         if(listing.length === 0 ){
//             console.log(listing);
//             req.flash("error","Oops! It seems we don't have listings for this country at the moment. Please try searching for another country, or explore our other listings. Thank you!");
//             res.redirect("/listings");
//         }else{
//             res.render("listings/countrySearch.ejs",{listing});


//         }

// })


// app.get("/", (req, res) => {
//     res.render("listings/home.ejs")
// });


// catch-all route for non existing routes

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "page not found!"));
});

// Error handling middleware
//ExpressError handling middleware

app.use((err, req, res, next) => {
    let { status = 500, message = "some error occure" } = err;
    res.status(status).render("error.ejs", { message });
});

