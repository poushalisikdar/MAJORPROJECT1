const Listing = require("../MODELS/listings.js");
const cloudinary = require('cloudinary').v2; 



module.exports.index = async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index.ejs", { listing: listings });

}



module.exports.newForm = async (req, res) => {
    res.render("listings/create.ejs");
}

module.exports.showRoute = async (req, res) => {
    let { id } = req.params;
    const list = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author",
        },
    }).populate("owner");

    if (!list) {
        req.flash("error", "listings you requested for does not exist");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { list });

}

module.exports.createRoute = async (req, res) => {

    // let {title,description,image,price} = req.body; (one way to insert data into data base)
    let url = req.file.path;
    let filename = req.file.filename;
    

    let listing = new Listing(req.body.listing);
    listing.owner = req.user._id;
    listing.image = { url, filename };
    await listing.save();
    req.flash("success", "New listings created");
    res.redirect("/listings");
};

module.exports.editRoute = async (req, res) => {

    const { id } = req.params;
    const listings = await Listing.findById(id);
    if (!listings) {
        req.flash("error", "listings you requested for does not exist");
        res.redirect("/listings");
    }
    let originalImgUrl = listings.image.url;
    let resizedImgUrl = cloudinary.url(originalImgUrl, { width: 200, height: 200, crop: "scale" });

    
    req.flash("success", "listings edited successfully");
    res.render("listings/edit.ejs", { listings, resizedImgUrl });
};

module.exports.updateRoute = async (req, res) => {
    let { id } = req.params;
     let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
   
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }
    req.flash("success", "listing updated succesfully");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteRoute = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "listing deleted succesfully");
    res.redirect("/listings");

}

