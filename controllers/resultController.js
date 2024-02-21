const {subtractTimes, convertToYearMonthDay} = require("../utils/getAttemptTime");
const {TestResult} = require("../models/result")
const {Test} = require("../models/pi_test")
const {Student} = require("../models/students_info")

const processResult = async (req,res) => {
    try{
        const {status, userId} = req.params;
        const {remainingTime, studentAnswer} = req.body;
        

        const {username} = req.user;
        
        const attemptTime = subtractTimes(remainingTime, "00:35:00")
        const allInfo = await Student.findById(userId);
        
        
        const test = await Test.find({test_name: "Pi Test"})
        
        const newResult = new TestResult({
            test_id: test.test_id,
            student_id: allInfo.student_id,
            answer: studentAnswer.toString(),
            status: status,
            attempt_time: `${convertToYearMonthDay(Date.now())} ${attemptTime}`,
            attempted_at: new Date().toISOString()

        })
        await newResult.save()
        
        res.redirect(`/api/v1/student/result/${status}/${userId}`)
    }catch(err){
        console.error("Error:", err)
    }
    
    
}

const renderResult = (req,res) => {
    const {userRole, status} = req.params
    
    
    res.render("result", {status, user: req.user, userRole})
}




module.exports = {renderResult, processResult}