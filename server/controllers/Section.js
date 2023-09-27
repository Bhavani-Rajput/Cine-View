const Section = require("../models/Section");
const Course = require("../models/Course");


exports.createSection = async(req, res) => {
    try{

        //data fetch
        const {sectionName, courseId} = req.body;
        //data validation 
        if(!sectionName || !courseId) {
            return res.status(400).json({
                success:false,
                message:'missing properties',
            });
        }
        //create section

        const newSection = await Section.create({sectionName});
        // update section course with section object id
        const updateCourseDetails = await Course.findByIdAndUpdate(courseId,
            {
            $push:{
                courseContent:newSection._id,
            },
        },
            {new:true}
        );
        // hw use populate
        //return response
        return res.status(200).json({
            success:true,
            message:'Section Create Successfully',
            updateCourseDetails,
        })
    }
    catch(error){
    
        return res.status(500).json({
            success:false,
            message:"unable to create section , please try again",
            error:error.message,
        });
    }
}

exports.updateSection = async (req ,res) =>{

    try{

        //data input
        const{sectionName , sectionId} = req.body ;
        //dat validation
        if(!sectionName || !courseId) {
            return res.status(400).json({
                success:false,
                message:'missing properties',
            });
        }
        
        //update data
        const section = await Section.findByIdAndUpdate(seciotnId ,{sectionName},{new:true});
        //retirn response
        return res.status(200),json({
            success:true,
            message:'Section Update seccessfu;lly',
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"unable to create updatesection , please try again",
            error:error.message,
        });
    }
};

exports.deleteSection = async(req, res) =>{

    try{
        //get id 
        const {seciotnId} = req.params
        //use findbyIDandDelete
        await Section.findByIdAndDelete(dectionId);
        // todo 
        //return response
        return res.status(200).json({
            success:true,
            message:"section delete success"
        })

    }  
    catch{


    }
}

