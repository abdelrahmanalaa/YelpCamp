var  express            = require("express"),
     app                = express(),
     bodyParser         = require("body-parser"),
     mongoose           = require("mongoose"),
     passport           = require("passport"),
     methodOverride     = require("method-override"),
     flash              = require("connect-flash"),
     localStrategy      = require("passport-local"),
     seedDB             = require("./seeds"),    
     User               = require("./models/user"),
     indexRoutes        = require("./routes/index"),
     campgroundRoutes   = require("./routes/campgrounds"),
     commentRoutes      = require("./routes/comments");
     
     
     
     
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp"
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');
// seedDB();

// passport configuration
app.use(require("express-session")({
    secret: "NO NO NO!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Litening");
});