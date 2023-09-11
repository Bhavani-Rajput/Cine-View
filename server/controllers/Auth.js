const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");


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
            })
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

        return res.status(400),json({
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
    const hashedPassword = await bcrypt.hash 
    //Entry create
    // return res

}  

//Login


// changePassword



