const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({ 

    courseName:{
      type:String,


    },
    couseDescription:{
        type:String,
        required:true,
        trim:true,

    },
    instructor:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        requied:true,
    },
    whatYouWillLearn:{
        type:String,
    },
    couseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",

        }
    ],
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview",

        }
    ],
    price:{
        type:Number,
    },
    thumbnail:{

        type:String
    },
    tag:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag",
    },
    studentsEnroll:[{
        type:mongoose.Schema.Types.ObjectId,
        requied:true,
        ref:"User",
    }]
});

module.exports = mongoose.model("Course",courseSchema)