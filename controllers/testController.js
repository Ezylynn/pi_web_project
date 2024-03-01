const {Test} = require("../models/pi_test")
const {TestResult} = require("../models/result")
const {convertToTimeFormat, subtractTimes} = require("../utils/getAttemptTime")
const renderTest = async (req,res) => {
    try{
        const test = await Test.find({test_name: "Pi Test"})
        let status;
        const {role} = req.user
        if (role === "student"){
            let userObject = await TestResult.findByStudentId(req.user.user_id)
        
            if (!userObject){
                status = "not done";
            }else{
                status = userObject.status;
            
            }   
        }
    
        const testCode = test.getTestCode()
        
    
       
        const {user_id} = req.user
        res.render("test", {userRole: role, user: req.user, user_id, status})

    }catch(err){
        throw err
    }
    
}


const getTime = async (req,res) => {
    try{
        const test = await Test.find({ test_name: "Pi Test" });
        const {test_code} = req.body
        const realTestCode = test.getTestCode()
        if (test_code.toString() === realTestCode.toString()){
            const startTimeFormatted = convertToTimeFormat(test.start_time);
            const endTimeFormatted = convertToTimeFormat(test.end_time);
            const time = subtractTimes(startTimeFormatted, endTimeFormatted);
        
            res.status(200).json({ time });
        }else{
            res.status(403).json({message: "Invalid Test Code"})
        }
        
        // Ensure that we are getting the start_time and end_time correctly.
        
    }catch(err){
        throw err
    }
}

module.exports = {renderTest, getTime}