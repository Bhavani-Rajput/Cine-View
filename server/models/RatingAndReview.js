const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({

    user:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"USer",
    
    },
    rating:{
        type:String,
        required:true,

    },
    review:{
        type:String,
        requiered:true,
    }


}); 

module.exports = mongoose.model("RatingAndReview",ratingAndReviewSchema)