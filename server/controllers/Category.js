
const Category = require("..models/Category"); 
exports.showAllCategory = async ( req, res ) => {
  
    try{
        const allcategory = await Category.find(
            {},
            {name: true, description:true}
        );
        res.status(200).json({
            success:false,
            data:allcategory,
        });

    }
    catch(error){
      return res.status(500).json({
        success:false,
        message:error.messsage,
      });
    }

};

exports.categoryPagedeatils = async ( res , res ) => {
    try{
        const selectedCategory = await Category.findById(categoryId)
        .populate("Courses")
        .exec();
        console.log(selectedCategory);
        // handle the case when the category is not found 
        if(!selectedCategory){
            console.log("Category not found");
            return res
            .status(484)
            .json({success : false , message :"Category not found"});
        }
        //Handle the case when there are no course
        if(selectedCategory.course.length == 0){
            console.log("No course found for the selected category");
            return res.status(404).json({
                success:false,
                message:"No courses found for the selected category"
            });
        }

        const selectedCourses = selectedCategory.courses;
        // get courses for other category

        const categoriesExceptSelected = await Category.find({
            _id :{$ne: categoryId},
        }).populate("courses");
        let differentCourses = [];
        for(const category of categoriesExceptSelected){
            differentCourses.push(...category.courses);
        }
        // get top-selling courses across all category
        const allcategories = await Category.find().populate("courses");
        const allCourses = allcategories.faltmap((category) => category.courses);
        const mostSellingCourses = allCourses
        .sort((a ,b)=> b.sold - a.sold)
        .slice(0, 10);

        res.status(200).json({
            selectedCourses:selectedCourses,differentCourses : differentCourses,
            mostSellingCourses:mostSellingCourses,
        });

    }
    catch(error){
      return res.status(500).json({
        success:false,
        message:"Internal server error",
        error:error.message,
      });
    }
};


