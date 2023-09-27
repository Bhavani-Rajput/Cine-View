const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); 


//send opt
exports.sendOTP = async( req,res)  => {

try{
    // fetch email from request ki body
    const {email} = req.body;

    //if user already exist
    const chechUserPresent = await User.dinfOne({emil});

    // if user already exit ,then return a response
    if(chechUserPresent){
        return res.status(401).json({
            success: false,
            message:'User already registered',
      })
    } 

    // generate otp
    var otp = otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,

    });
    console.log("OTP generated :",top);
    // check unnic opt or not

    let result = await OTP.find({otp:opt});

    while(result){
        otp = otpGenerator(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
    
        });
    
    
let result = await OTP.find({otp:opt});
while(result) {
otp = otpGenerator(6, {
upperCaseAlphabets: false, 
lowerCaseAlphabets: false,
specialChars: false,

});
result = await OTP. findOne({otp: otp});

}

const otpPayload={email, otp};
//create an entry for OTP
const otpBody = await OTP.create(otpPayload); 
console.log(otpBody);

//return response successful
res.status (200).json({ message: 'OTP Sent Successfully',
success:true,
message:'OTP send Successfuly',otp
})
    }
}
  
  catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:error.message,
    })

    }
};

//sign up

    exports.signUp  =  async (req,res) =>{
        try{
       //data fetch
        const {
            firstName, 
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            opt
    
        } = req.body;
    
        //validate
        if(!firstName  || !lastName || !email ||  !password || !confirmPassword || !accountType || !contactNumber,
            !opt){
                return res.status(403).json({
                    success:false,
                    message:"All fields require",
                });
            }
        // 2 pass
        if(password != confirmPassword){
    
            return res.status(400).json({
                success:false,
                message:"passwaord and confirmPassword value does not match please try again"
            });
        }
        // check user already
        const existingUser = await User.findOne({email});
        if(existingUser){
    
            return res.status(400).json({
                success:false,
                message:"user is already register",
            });
             
        }
    
        //find out recent
         const recentOtp = await OTP.find({email}).sort({ceratedAt:-1}).limit(1);
        // validate opt
        if(recentOtp.length==0){
            //otp not found 
            return res.status(400).json({
                success:false,
                message:'otpp found',
            })
        }   else if(opt !== recentOtp.otp){
            //invalid opt
            return res.status(400).json({
                success:false,
                message:"Invalid OTP",
            });
        }
        //hash
        const hashedPassword = await bcrypt.hash(password,10); 
        //Entry create
        const profileDetails = await profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
    
        });
        const user = await user.create({
           
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails,
            image:'https://api.dicebear.com.5.x/initials/svg?seed= ${fisrtName} ${lastName}',  
        })
      
        // return res
        return res.status(200).json({
            success:true,
            message:'user is register successfulluy',
            user,
        });    
} 

catch(error){
  console.log(error);
  return res.status(500).json({
    success:false,
    message:"user be registered pleass try again",
  }) 
}
};

//Login
exports. login = async ( req ,res) => {
      
    try{
        //get data req ki body
        const {email,password} =req.body;
        // validation data
        if(!email || ! password){
            return res.satus(403).json({
                success: false,
                message:'all fields are required ,plase tyr again'
            });
        }
        // user check exist or not
        const user = await user.findOne({eamil}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered please singup fisrt",
            });
        }
        //generate jwt after pass matching
           if(await bcrypt.comapare(password, user.password)){
            const payload = {
                email:user.email,
                id:user.id,
                accountType:user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:"2h"});
            user.token = token;
            user.password = undefined;
           
        //create cookie and send response
          const option = {
            expire: new Date(Date.now()+ 3*24*60*1000),
            httpOnly:true,

          }
         res.cookie("Token",token ,option ).status(200).json({
            success:true,
            token,
            user,
            message:'Logged in successfully',
          }) 
        }
        else{
            return res.satus(401).json({
                success:false,
                message:'password is incorrect',
            });
        }
    }
    catch(error){
        console.log(error);
        return res.satus(500).json({
            success:false,
            message:'login failure , please try agin'
        })

    }
};



// changePassword
exports .changePassword = async( req , res ) =>{
    //get data from req body
    //get old pass , new pass , confirmpass
    //validation
    //update pwd in db
    //send mail-pass update
    // return response
}


