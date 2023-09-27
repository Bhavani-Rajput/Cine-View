const mongose = require("mongoose");

// define the tags schema
const categorySchema =new mongose.Schema({   name:{
      type: String,
      required:true,
   },
   description:{ type:String},
   courses:[
    {
        type:mongose.Schema.Types.ObjectId,
        ref:"Course",
    },
   ],

});

// Exports the tag model
module.exports = mongose.model("Category",categorySchema);