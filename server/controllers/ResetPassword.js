const User = require("../models/User");
const mailSender = require("../utils/mailsender");
const bcrypt = require("bcrypt");

// resetPasswordToken
exports.UserresetPasswordToken = async( req, res ) => {
    
try{
  // getemail from req body
const email = req.body.email;
// check user for this email validation
const user = await User.finOne({email:email});
if (!user){
    return res.json({
        success:false,
        message:'Your Email isNOt register with us'
    });
}
// generate token
const token = crypto.randomUUID();
// updtae user by adding toekn and expiration time
const updateDetails = await User.findOneAndUpdate(
    {email:email},
    {
        token:token,
        resetPasswordExpires: Date.now() + 5*60*1000,
    },
    {new:true});
// create url
const url = 'http://localhost:3000/update-password/${token}'
// send mail containing the url
await mailSender( email,"Password Reset Link",
                'Password Reset Link:${url}' )
//return response
return res.json({
    success :true,
    message:'Email send successfully ,please checj email and change password '
}) 
}
catch(error){
   console.log(error);
   return res.status(500).json({
    success:false,
    message:'Something went wrong While sending reset pwd mail'
   });
}

}

//resetPassword
exports.resetPassword = async( req, res ) => {

    try{
     //data fatch
    const {password , confirmPassword , token} = req.body;
    //validation
    if(password !== confirmPassword){
        return res.json({
            success:false,
            message:'Password not Matching',
        });
    }
    // get  userdetail from db using token
    const userdetail = await User.findOne({
        token:token
    });
    // if no enrty = invalid token
    if(!userdetail){
        return res.json({
            success:false,
            message:'Token is invalid'
        });
    }
    // token time check
    if(userDetail.resetPasswordExpires < Date.now() ){
        return res.json({
            success:false,
            message:'Token is expired , please regenerate your token',
        });
    }

    // hash pwd
    const hashedPassword = await bcrypt.hash(password ,10);

    //password update
    await User.findOneAndUpdate(
        {token:token},
        {password:hashedPassword},
        {new:true},
        
    );
    // password update
    return res.status(500).json({
        success:true,
        message:'password reset successfully',
        
    });
}

catch(error){
    console.log(error);
   return res.status(500).json({
    success:false,
    message:'password change sucessfuly'
   });
}

}