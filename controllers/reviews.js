const Listing = require("../MODELS/listings.js");
const Review = require("../MODELS/review.js");

module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;
     await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","review deleted successfully");
    res.redirect(`/listings/${id}`);

};

module.exports.createReview = async (req, res) => {
    
    let listing = await Listing.findById(req.params.id);

    const  newreview = new Review(req.body.review);
    newreview.author = req.user._id;// author is inserted through req.user._id;
    listing.reviews.push(newreview);
    await newreview.save();
    await listing.save();
    req.flash("success","new review created");
    res.redirect(`/listings/${req.params.id}`);
}