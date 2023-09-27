const ratingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");
const { default: mongoose } = require("mongoose");

//creating 
exports.createRating = async (req, res) =>{

    try{
   // get user id
   const userId = req.user.id;
   //fetching from req body
   const {rating , review ,courseId} = req.body;
   //check if user is enroll or not
   const courseDetails = await Course.findOne(
    {
        _id:courseId,
        studentsEnroll:{$elemMatch:{$eq:userId}},
    }
   );
   if(!courseDetails){
    return res.status(404).json({
        success:false,
        messsage:'Student is not enrolled in the course',
    });
   }
   // check if user already reviewd the course
   const alreadyReviewed = await RatingAndReview.findOne({
                user:userId,
                course:courseId,
   });
   if(alreadyReviewed){
    return res.status(403).json({
        success:false,
        message:'Course is alread reviews by the user',
    });
   }
   //create rating and review
   const ratingAndReview = await RatingAndReview.create({
    rating,review,
    course:courseId,
    user:userId,
   });
   //update course with this rating/review
   const updateCourseDetails = await Course.findByIdAndUpdate({_id:courseId},{
         $push:{
            ratingAndReviews:ratingAndReview._id,
        }    
   },{new:true}
   );
   console.log(updateCourseDetails);
   //return response
   return res.status(200).json({
    message:"Rating and Review create Successfullly",
    ratingReview,
   });
    }
    catch(error){
     console.log(error);
     return res.status(404).json({
        success:false,
        message:error.message,
     });
    }
};

// getAvrageRating

exports.getAvrageRating = async(req, res) => {
    try{
        //getcourse rating
        const courseId = req.body.courseId;
        //calculate and rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{course: new mongoose.Types.ObjectId(courseId)
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{ $avg: "$rating"},

                }
            }
        ] )
        //return rating
        if(result.length > a){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })

        }
        // if no rating/Review exist
        return res.status(200).json({
            success:true,
            message:'Avrage Rating is 0 , no raitng till now',
            averageRating:0,
        });

    }
    catch(error){
    console.log(error);
     return res.status(404).json({
        success:false,
        message:error.message,
     
    });
}

};
//getallRating
exports.getAllRating = async (req, res) =>{
    try{
      const allReview = await RatingAndReview.find({})
      .sort({rating:"desc"})
      .populate({
        path:"user",
        select:"firstName lastName email image",
      })
      .populate({
        path:"course",
        select:"courseName",
      })
      .exec();
      return res.status(200).json({
        success:true,
        message:"All review fetched successfully",
        data:allReview,
      });
    }
    catch(error){
        onsole.log(error);
     return res.status(500).json({
        success:false,
        message:error.message,
     
    });

    }


};