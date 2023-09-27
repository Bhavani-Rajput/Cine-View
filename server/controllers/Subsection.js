const Subsection = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadImageToCloudinary} = require("../utills/imageUploader")
// Create SubSection

exports.createSubSection = async (req, res) => {
  
    try{
    // fetch data
     const {sectionId , title , timeDuration , description} = rq.body;
    //extract file/video
    const video = req.files.videFile;
    //validation
    if(!sectionId || !title || !timeDuration || !description || !video){
        return res.status(400).json({
            success:false,
            message:'All fiels are require',
        });
    }
    //upload video to cloudinary
    const uploadDetails = await uploadImageToCloudinary(video , process.env.FOLDER_NAME);

    //create a sub-section
    const subSectionDetails = await SubSection.create({
        title:title,
        timeDuration:timeDuration,
        description:description,
        videoUrl:uploadDetails.secure_url,
    })
    //update section wiht this subsection
    const updatedSection = await ScreenOrientation.findByIdAndUpdate({
        $push:{
            subSection:SubSectionDetails._id,

        }
    }  , {new:true});
    
    // hw: log upload section after adding populate query
    //return response
    return res.status(200).json({
        succdess:true,
        message:"sub section create seccessfully",
        updatesection,
    });
    }
    catch(error){ 
     return res.status(500).json({

        success:false,
        message:"Internal server Error",
        error:error.message,
     })

    }

    };
     
    //hw updatesection 
    // hw :delete the section
