var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
         name: String,
         price: String,
         location: String,
         lat: Number,
         lng: Number,
         image: String,
         createdAt: { type: Date, default: Date.now },
         description: String,
         comments: [
                  {
                           type: mongoose.Schema.Types.ObjectId,
                           ref: "Comment"
                  }
                  ],
         user: {
                  id: {
                           type: mongoose.Schema.Types.ObjectId,
                           ref: "User"
                  } ,
                  username: String
         }         
     });
module.exports = mongoose.model("Campground",campgroundSchema);
