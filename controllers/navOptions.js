const Listing = require("../MODELS/listings.js");

module.exports.mountain = async (req, res) => {
    const listings = await Listing.find({ category: "Mountain" });
    res.render("navOptions/mountain.ejs", { listings });
}

module.exports.boutiquehotel = async (req, res) => {
    const listings = await Listing.find({ category: "Boutique Hotel" });
    res.render("navOptions/boutiquehotel.ejs", { listings });
}

module.exports.villa = async (req, res) => {
    const listings = await Listing.find({ category: "Villa" });
    res.render("navOptions/villa.ejs", { listings });
}

module.exports.room = async (req, res) => {
    const listings = await Listing.find({ category: "Room" });
    res.render("navOptions/room.ejs", { listings });
}

module.exports.igloo = async (req, res) => {
    const listings = await Listing.find({ category: "Igloo" });
    res.render("navOptions/igloo.ejs", { listings });
}

module.exports.pool = async (req, res) => {
    const listings = await Listing.find({ category: "Pool" });
    res.render("navOptions/pool.ejs", { listings });
}

module.exports.tent = async (req, res) => {
    const listings = await Listing.find({ category: "Tent" });
    res.render("navOptions/tent.ejs", { listings });
}

module.exports.beach = async (req, res) => {
    const listings = await Listing.find({ category: "Beach" });
    res.render("navOptions/beach.ejs", { listings });
}

module.exports.country = 
    
    async(req,res)=>{
        const countryName = req.query.listing?.country; // Extract the country name from the nested 'listing' object
            const listing = await Listing.find({ country: countryName });
            if(listing.length === 0 ){
                console.log(listing);
                req.flash("error","Oops! It seems we don't have listings for this country at the moment. Please try searching for another country, or explore our other listings. Thank you!");
                res.redirect("/listings");
            }else{
                res.render("listings/countrySearch.ejs",{listing});
            
    
            }
    
    }
 


