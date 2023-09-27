const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async ( res,res) =>{
    try{
      // get data
      const{ dateOfBirth="", about="", constactNumber , gender } = req.body;
      // get userId
      const id = req.user.id;
      //validation
      if(!constactNumber || !gender || !id){
        return res.status(400).json({
            seccess:false,
            message:'All fields are required',
        });
      }
      //find profile
      const userDetails = await User.findById(id);
      const profileId = userDetails.additionalDetail;
      const profileDetails = await profileId.findById(profileId);
      //update profile
      profileDetails.dateOfBirth =dateOfBirth;
      profileDetails.about = about;
      profileDetails.gender= gender;
      profileDetails.constactNumber = constactNumber;
      await profileDetails.save();
      //return response
     return res.status(200).json({
        success:true,
        messsage:'Profile update Successfully',
        profileDetails,
     });

    }
    catch{
      return res.status(500).json({
        success:false,
        error:error.message,
      });
    }
}; 

// deteleaccount
// Explolre -> how can we


exports.dateleAccount = async (req,res) =>{
   
    try{
        //get id
        const id = req.user.id;
        //validation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(484).json({
                success:false,
                message:"User not found",
            });
        }
        //delete profile
        await profile.findByAndDelete({_id:userDetails.additionalDetail});
        //todo:
        //delete user
        await Profile.findByIdAndDelete({_id:id});
        // return response
        return res.status(200).json({
            success:true,
            message:"User Delete Successfully",
        })

    }
    catch(error){
       return res.status(500),json({
        success:false,
        message:'User can not delete successfully'
       }); 

    }
};

exports.getAllUserDetails = async(req ,res) => {
    
    try{
     // get id
     const id = req.user.id
     // validation and get user details
     const userDetails = await User.findById(id).populate("Additonaldetails").exec();
     // return response
     return res.status(200).json({
        success:true,
        message:"User Data Fetched Successfully",
     });
     
    }
    catch(error){
      return res.status(500).json({
        success:false,
        message:error.message,
      });
    }
};