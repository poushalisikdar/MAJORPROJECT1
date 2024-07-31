const mongoose = require("mongoose");
const Review = require("./review.js");
const { required } = require("joi");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        
    },

    image: {
        url: String,
        filename: String,
        
    },

    price: {
        type: Number,
        
    },

    location: {
        type: String,
        
    },
    country: {
        type: String,
       
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }],
    

    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },

    category:{
        type:String,
        enum:[ "Boutique Hotel","Villa","Room","Pool", "Igloo","Tent","Beach","Mountain"],
        required:true,
        
    },
    
});


// mongoose middle ware finfbyidand delete
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        let res = await Review.deleteMany({ _id: { $in: listing.reviews } })
        console.log(res);

    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;


