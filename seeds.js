var mongoose   =     require("mongoose"),
Campground =     require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name: "BElla",
        image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg",
        description: "hand, to print all that is most valuable of the yet unprinted MSS. in English, and, on the other, to re-edit and reprint all that is most valuable in printed English books, which from their scarcity or price are not within the reach of the student of moderate "
    },
    {
        name: "Riven",
        image: "https://farm5.staticflickr.com/4101/4961777592_322fea6826.jpg",
        description: "hand, to print all that is most valuable of the yet unprinted MSS. in English, and, on the other, to re-edit and reprint all that is most valuable in printed English books, which from their scarcity or price are not within the reach of the student of moderate "
    },
    {
        name: "draven",
        image: "https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg",
        description: "hand, to print all that is most valuable of the yet unprinted MSS. in English, and, on the other, to re-edit and reprint all that is most valuable in printed English books, which from their scarcity or price are not within the reach of the student of moderate "
    }
    ];
function seedDB(){ 
    Comment.remove({},function(err){
       if(err){
           console.log(err);
       } else{
           console.log("comments deleted");
       }
    });
Campground.remove({},function(err){
   if(err){
       console.log(err);
   } else {
       console.log("campgrounds deleted");
   }
});
data.forEach(function(newCampground){
   Campground.create(newCampground,function(err,camp){
       if (err){
           console.log(err);
       } else {
           console.log("new one created");
           Comment.create({
               text: "this is a mothafucking trap!!",
               author: "homer"
           },function(err,comment){
               if(err){
                   console.log(err);
               } else {
                   camp.comments.push(comment);
                   camp.save();
                   console.log("new comment added");
               }
           });
       }
   }); 
});
}
module.exports = seedDB;