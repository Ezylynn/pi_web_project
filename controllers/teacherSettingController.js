const {Test} = require("../models/pi_test")
const { subtractTimes, convertISO, convertToTimeFormat, convertToYearMonthDay} = require("../utils/getAttemptTime")

const renderSetting = async (req,res) => {
    const {role} = req.user
    const {page} = req.params;
    const piTest = await Test.find({test_name: "Pi Test"})
    piTest.start_time = convertToTimeFormat(piTest.start_time)
    piTest.end_time = convertToTimeFormat(piTest.end_time)
    piTest.test_date = convertToYearMonthDay(piTest.test_date)
    const testCode = piTest.getTestCode()

    res.render("teacherSetting", {userRole: role, user: req.user, page, testCode, piTest})
}

const updateTest = async (req,res) => {
    
    try{
        const {page} = req.params;
        const piTest = await Test.find({test_name: "Pi Test"})
        console.log(page)
        
        const testCode = piTest.getTestCode()

        if (page === "test"){
            const {test_date, start_time, end_time, test_name} = req.body;
            console.log(`${test_date} ${start_time}`)
            console.log(`${test_date} ${end_time}`);

            await Test.update(test_name, {test_date, start_time: `${test_date} ${start_time}`, end_time: `${test_date} ${end_time}`})
        }
        piTest.start_time = convertToTimeFormat(piTest.start_time)
        piTest.end_time = convertToTimeFormat(piTest.end_time)
        piTest.test_date = convertToYearMonthDay(piTest.test_date)
        res.render("partials/timeSetting", { testCode, piTest},  function(err, html) {
            if (err) {
                console.error(err);
                res.status(500).send('Error rendering testing info');
            } else {
                
                res.send(html);
            }
        })
    }catch(err){
        throw err
    }
    

    
    
}
module.exports = {renderSetting, updateTest}