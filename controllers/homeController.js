const {TestResult} = require("../models/result")
const renderHome = async (req,res) => {
    const {role} = req.user;
    let status;
    if (role === "student"){
        let userObject = await TestResult.findByStudentId(req.user.user_id)
        
        if (!userObject){
            status = "not done";
        }else{
            status = userObject.status;
            
        }   
    }
    
    
    res.render("home", {userRole: role, user: req.user, status})
}

module.exports = {renderHome}