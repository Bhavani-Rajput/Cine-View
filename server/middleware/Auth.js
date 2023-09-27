const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/User");

// auth
exports.auth = async( req, res , next) => {

    try{
       // extract toekn
        const token = req.cookies.token ||
        req.body.token
        || req.header("Authorisation").replace("Bearer" ,"");
       // if token is misssing
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token is misssing'
            });
        }

        //verify the token
        try{
            const decode =  jwt.verify(token , process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;

        }
        catch(err){
            //verification - issue
            return res.status(401).json({
                sucess:false,
                message:'token is invalid',
            });

        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:'something went wrong validating the token'
        });

    }
}

//isStudent
exports,isStudent = async (req , res , next) => {

    try{
        if(req.user.accounType !== "Student") {
            return res.status(401).json({
                success:false,
                message:'this is a procted route for student only',
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role can not be verified , please try again'
        })
    }
}

//isInstructor
exports,isInstructor = async (req , res , next) => {

    try{
        if(req.user.accounType !== "Instructor") {
            return res.status(401).json({
                success:false,
                message:'this is a procted route for Instructor only',
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role can not be verified , please try again'
        })
    }
}

//isAdmin
exports,isAdmin = async (req , res , next) => {

    try{
        if(req.user.accounType !== "Admin") {
            return res.status(401).json({
                success:false,
                message:'this is a procted route for Admin only',
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role can not be verified , please try again'
        })
    }
}
