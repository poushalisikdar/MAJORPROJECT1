const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../MODELS/listings.js");


main()// function call
    .then(() => {
        console.log("connection succesful");
    })
    .catch((err) => {
        console.log(err)
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
};

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:'669e25fd865561fa0efcd044',}));

    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();