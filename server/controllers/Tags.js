const Tag = require("../models.tags");
//create Tag ka handler function
exports.createTag = async(req ,res) => {
    try{
        //fetch data
        const{name, description} =req.body;
        //validation
        if(!name || !description ){
            return res.status(400).json({
                success:false,
                message:'All fiels are required',
            })
        }
        // create entry in db
        const tagDetails = await Tag.create({
            name:name,
            desccription:description,
        });
        console.log(tagDetails);
        //return response
        return res.status(200),json({
            success: true,
            message:"Tag create successfully"
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })

    }
};

// getAll tags handle function
exports.showAlltags = async (req ,res) =>{

    try{
      const showAlltags = await Tag.find({}, {name:true , description:true});
      res.status(200).json({
        success:true,
        message:"All tags returned successfully",
        allTags,
      })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })

    }
};

 