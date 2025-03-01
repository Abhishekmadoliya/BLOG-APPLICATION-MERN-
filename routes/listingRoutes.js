const express = require("express");
const Router = express.Router();

const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressErrors.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const { isLoggedIn, isOwner,validateListing } = require("../middleware.js");



Router.get("/", async (req, res, next) => {
  try {
    const listing = await Listing.find({});
    res.render("listings/index", { listing });
  } catch (err) {
    next(err);
  }
});

//new route - should be before :id route
Router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new");
});

//show route - fix parameter format
Router.get(
  "/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const listingid = await Listing.findById(id)
      .populate("reviews")
      .populate("owner");

    if (!listingid) {
      req.flash("error", "Listing you requested for does not exits");
      res.redirect("/listings");
    }
    res.render("listings/show", { listingid });
  })
);

// create route
Router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res, next) => {
    
   try{
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New listing created");
    // res.redirect(`/listings/${newListing._id}`);
    res.redirect("/listings");
  }catch(err){
      console.log(err);
      next(err);

    }

  })
);

//edit route

Router.get(
  "/:id/edit",

  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    try {
      const listings = await Listing.findById(id);
      if (!listings) {
        req.flash("error", "Listing you requested for does not exits");
        res.redirect("/listings");
      }
      res.render("listings/edit.ejs", { listings });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  })
);

//update route
Router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;

    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated");
    res.redirect("/listings");
  })
);

//detele route

Router.delete(
  "/:id",
  isOwner,
  isLoggedIn,
  wrapAsync(async function (req, res) {
    const { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "listing Deleted");
    res.redirect("/listings");
  })
);

module.exports = Router;
