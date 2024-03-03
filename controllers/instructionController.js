const {TestResult} = require("../models/result")
const {Test} = require("../models/pi_test")
const {convertToTimeFormat, subtractTimes} = require("../utils/getAttemptTime")
const renderInstruction = async (req,res) => {
    const test = await Test.find({ test_name: "Pi Test" });
    const startTimeFormatted = convertToTimeFormat(test.start_time);
    const endTimeFormatted = convertToTimeFormat(test.end_time);
    const time = subtractTimes(startTimeFormatted, endTimeFormatted);
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
    res.render("instruction", {userRole:role, user: req.user, user_id, status, time})
}

module.exports = {renderInstruction}