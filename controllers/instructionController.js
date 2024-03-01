const {TestResult} = require("../models/result")
const renderInstruction = async (req,res) => {
    const {user_id} = req.user;
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
    res.render("instruction", {userRole:role, user: req.user, user_id, status})
}

module.exports = {renderInstruction}