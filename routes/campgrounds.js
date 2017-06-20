var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
var geocoder = require('geocoder');
router.get("/",function(req,res){
   Campground.find({},function(err,campgrounds){
       if(err)
          console.log(err);
        else
        {
           res.render("campgrounds/index",{campgrounds: campgrounds, page: 'campgrounds'});
        }
   });
});
router.get("/new",middleware.isLoggedIn,function(req,res){
   res.render("campgrounds/new"); 
});
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,campground){
        if(err){
            console.log(err);
        } else {
        res.render("campgrounds/show", {campground: campground});
                }
        });
});
router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.img;
  var desc = req.body.desc;
  var user = {
      id: req.user._id,
      username: req.user.username
  };
  var price = req.body.price;
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newCampground = {name: name, image: image, description: desc, price: price, user: user, location: location, lat: lat, lng: lng};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
  });
});

router.get("/:id/edit",middleware.checkCampgroundOwnerShip,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        res.render("campgrounds/edit",{campground: campground});
    });
    
});

router.put("/:id", function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.name, image: req.body.imag, description: req.body.desc, price: req.body.price, location: location, lat: lat, lng: lng};
    Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/" + campground._id);
        }
    });
  });
});

router.delete("/:id",middleware.checkCampgroundOwnerShip,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err,deletedCamp){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");
        }
    });
});



module.exports = router;