var Campground = require("../models/campground");
var Comment = require("../models/comment");
module.exports = {
  checkCampgroundOwnerShip: function(req,res,next){
      if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,campground){
        if(err){
                req.flash("error",err.message);
        } else{
            if( req.user.isAdmin || req.user._id.equals(campground.user.id)){
                next();      
            }
            else{
                req.flash("error","Permission denied");
                res.redirect("back");
            }
            }
    });    
    }
    else{
        req.flash("error","You must be logged in!");
        res.redirect("/login");
    }

  },
  isLoggedIn: function(req,res,next){
      if(req.isAuthenticated()){
        return next();
    }
     req.flash("error","You must be logged in!");
     res.redirect("/login");
  },
  checkCommentOwnerShip: function(req,res,next){
      if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            req.flash("error", "Campground not found");
            res.redirect("back");
        } else{
            if(req.user.isAdmin || req.user._id.equals(foundComment.author.id)){
                next();      
            }
            else{
                req.flash("error","Permission denied");
                res.redirect("/login");
            }
            }
    });    
    }
    else{
        res.redirect("/login");
    }
  }
};