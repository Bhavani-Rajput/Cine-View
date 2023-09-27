const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema({

     name:{
        type:String,
        requiered:true,
     },
     description:{
        type:String,
     },
     couse:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
     },

}); 

module.exports = mongoose.model("Tag",tagsSchema)