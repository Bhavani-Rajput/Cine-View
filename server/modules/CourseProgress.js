const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({

    gender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    completeVideos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubSrction"
        }
    ]
  

});

module.exports = mongoose.model("CourseProgress",courseProgressSchema)  