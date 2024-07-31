const Listing = require("./MODELS/listings.js");
const asyncWrap = require("./utils/wrapasync.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./MODELS/review.js");
const { listingSchema,reviewSchema } = require("./schema.js");

module.exports.isLoggedin = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.currUrl = req.originalUrl;
        req.flash("error","You must be logged in to create listing");
       return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirect = (req,res,next)=>{
    if(req.session.currUrl){
        res.locals.currUrl = req.session.currUrl; 
    }
    next();
    
};

module.exports.isOwner =  asyncWrap(async(req,res,next)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "Only owner has permission to update the listing");
        return res.redirect(`/listings/${id}`);
    } next();
});


// reviews schema validation using joi middleware
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        next(new ExpressError(400, error.details[0].message));
    } else {
        next();
    }
};
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        next(new ExpressError(400, error.details[0].message));
    } else {
        next();
    }
};
module.exports.isReviewAuthor = asyncWrap(async(req,res,next)=>{
    
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","you can't delete other's comment");
         return res.redirect(`/listings/${id}`);
    }
     next();
})
