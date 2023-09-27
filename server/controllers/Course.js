const Course = require("..model/Course");
const Tag = require("../models.tags");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("...utils/imageUploader");

// createcourse handler  function

exports.createCourse = async (req , res) =>{
    try{
        //fetch data 
        const {courseName , courseDescription , whatYouWillLearn , price ,tag} = req.body;
        // get thumbnail
        const thumbnail = req.files.thumbnailImage;
        
        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || tag ){
            return res.status(400).json({
                success:false,
                message:'All field are require',
            });
        }
        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor detail:", instructorDetails);
        //todo verify that id and instructorid are same or different

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor Detail not found"
            });
        }
        //check given tag is valid or not
        const tagDetails = await Tag.findById(tag);
        if(!tagDetails){
            return res.status(404).json({
                success:false,
                message:"Tag Details not found",
            });
        }
       // upload Image top Cloudinary
       const thumbnailImage = await uploadImageToCloudinary(thumbnail , process.env.FOLDER_NAME);
       // create an entry for new course
       const newCourse = await Course.create({
        courseName,
        courseDescription,
        instructor:instructorDetails._id,
        whatYouWillLearn:whatYouWillLearn,price,
        tag:tagDetails._id,
        thumbnail:thumbnailImage.secure_url,
       })

       //add the new course to the user  scehma of Instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
        );

       // update the TAg to schema
       // TODO:

// return response
return res.status(200).json({
    success:true,
    message:"Course creste successfully",
    data:newCourse,
});

    }
    catch(error){
      console.error(error);
      return res.status(500).json({
        success:false,
        message:'Failed to create course',
        error:error.message,
      });
    
    }
};

//getallcourses handler function
exports.showAllCourses = async( req , res) => {
    try{
     const allCourses = await Course.find({}, {  courseName:true,
                                                 price:true,
                                                instructor:true,
                                                ratingAndReview:true,
                                                studentsEnrolled:true, })
                                        .populate("instructor").exec();
        return res.status(200).json({
            success:true,
            message:'Data for all courses fetched successfully',
            data:allCourses,
        });
                    
      
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'cannot fetch course data',
            error:error.message,
        })

    }
};

// getCoursesdeatails
exports.getCourseDetails = async ( req, res) => {

    try{
    //get if
    const {courseId} = req.body;
    // find course detail
    const courseDetails = await Course.find({_id:courseId})
    .populate(
        {
            path:"Instructor",
            populate:{
                path:"additonalDetails",
            },
               }
    )
    .populate("category")
    .populate("ratingAndreview")
    .populate({
        path:"courseContact",
        populate:{
            path:"subSection"
        },
    })
    .exex();
    // validation 
    if(!courseDetails){
       return res.status(400).json({
        success:false,
        message:'Could not find the course with ${coureId}',
       });
    }
    // return response
    return res.status(200).json({
        success:true,
        message:'course detail fetched successfully',
        data:courseDetails,
    })
}
    catch(error){
     console.log(error);
     return res.status(500).json({
        success:false,
        message:error.message,
     });

    }
};