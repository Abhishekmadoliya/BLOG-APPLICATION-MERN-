const express = require("express");
const Router = express.Router({ mergeParams: true }); // Add mergeParams
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressErrors.js");
const Listing = require("../models/listing.js");
const Review = require('../models/review.js');
const { validateReview } = require("../middleware.js");


// Validation middleware


// Review post route
Router.post("/", validateReview, wrapAsync(async (req, res) => {
    try{
        const { id } = req.params;
    const listing = await Listing.findById(id);
    
    if (!listing) {
        throw new expressError(404, "Listing not found");
    }
    
    const newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    
    await Promise.all([
        newReview.save(),
        listing.save()
    ]);
    req.flash("success","New Review Created");
    
    res.redirect(`/listings/${listing._id}`);
    }catch(err){
        console.log(err);
        
    }
}));

// Delete review route
Router.delete("/:review_id", wrapAsync(async (req, res) => {
    const { id, review_id } = req.params;
    
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: review_id } });
    await Review.findByIdAndDelete(review_id);
    req.flash("success"," Review Deleted");
    res.redirect(`/listings/${id}`);
}));

module.exports = Router;