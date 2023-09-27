const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({ 

    title:{
        type: String,

    },
    timeDuration:{
         type:String,
    },
    description:{
        type:String,
        
    },
    vieoUrl:{
        type:Number,
        trim:true,
    }

});

module.exports = mongoose.model("SubSection",subSectionSchema)