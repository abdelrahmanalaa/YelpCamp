var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/",function(req,res){
   res.render("home"); 
});

router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});



router.post("/register",function(req,res){
   User.register(new User({username: req.body.username}),req.body.password,function(err,user){
      if(err){
          console.log(err);
          return res.render("register", {error: err.message});
      }
      passport.authenticate("local")(req,res,function(){
          req.flash("success","Welcome " + req.user.username );
          res.redirect("/campgrounds");
      });
   });
});

router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

router.post("/login",passport.authenticate("local",{
    
    failureRedirect: "/login",
    failureFlash: true
}),function(req,res){
    req.flash("success","Welcome " + req.user.username );
    res.redirect("/campgrounds");
});

router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged you out hope to see you soon!");
    res.redirect("/");
});

module.exports = router;