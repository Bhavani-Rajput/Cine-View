const mongoose = require("mongoose");
require("dotenv"),config();

exports.connect = ()=>{

    mongoose.connect(process.env.MONGODB_URL,{
        userNewUrlParser: true,
        useUnifieldTopology:true,
    })

.then(()=> console.log("db connect succesfully"))
.catch((error) => {
    console.log("DB connection Failed")
    console.error(error);
    process.exit(1);
})
};