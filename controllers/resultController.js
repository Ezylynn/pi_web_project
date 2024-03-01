const {subtractTimes, convertToYearMonthDay, convertToTimeFormat} = require("../utils/getAttemptTime");
const {transformText} = require("../utils/text")
const {TestResult} = require("../models/result")
const {Test} = require("../models/pi_test")
const {Student} = require("../models/students_info")

const processResult = async (req,res) => {
    try{
        const {status, userId, test} = req.params;
        const {remainingTime, studentAnswer} = req.body;
        const allIds = await TestResult.fetchAllIds().then(result => {
            if (!result){
                return []
            }else{
                
                return result
            }
        })
        
        let time = await Test.find({test_name: transformText(test)})
        
        console.log(`Answer: ${studentAnswer}`)
        console.log(remainingTime)
        
        const fullTime = subtractTimes(convertToTimeFormat(time.start_time), convertToTimeFormat(time.end_time))
        

        if (allIds.includes(parseInt(userId))){
            
            await TestResult.update(parseInt(userId), {
                answer: studentAnswer.toString(),
                status: status,
                attempt_time: `${convertToYearMonthDay(Date.now())} ${subtractTimes(fullTime, remainingTime)}`,
                attempted_at: new Date().toISOString()
    
            })
        }else{
            const allInfo = await Student.findById(userId);
        
        
            const test = await Test.find({test_name: "Pi Test"})
        
            const newResult = new TestResult({
                test_id: test.test_id,
                student_id: allInfo.student_id,
                answer: studentAnswer.toString(),
                status: status,
                attempt_time: `${convertToYearMonthDay(Date.now())} ${subtractTimes(fullTime, remainingTime)}`,
                attempted_at: new Date().toISOString()

            })
        
            await newResult.save()

        }
        
        
        res.redirect(`/api/v1/student/pi-test/result/${status}/${userId}`)
    }catch(err){
        console.error("Error:", err)
    }
    
    
}

const renderResult = (req,res) => {
    const {status} = req.params
    const {role} = req.user
    
    
    
  
    
    
    res.render("result", {status, user: req.user, userRole: role})
}




module.exports = {renderResult, processResult}