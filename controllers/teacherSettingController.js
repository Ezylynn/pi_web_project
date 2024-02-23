const {Test} = require("../models/pi_test")

const renderSetting = (req,res) => {
    const {role} = req.user
    const {page} = req.params;

    res.render("teacherSetting", {userRole: role, user: req.user, page})
}

const updateTest = async (req,res) => {
    const {section} = req.params;
    const {role} = req.user
    const {page} = req.params;

    if (section === "time"){
        const {test_date, start_time, end_time, test_name} = req.body;
        console.log(`${test_date} ${start_time}`)
        console.log(`${test_date} ${end_time}`);

        await Test.update(test_name, {test_date, start_time: `${test_date} ${start_time}`, end_time: `${test_date} ${end_time}`})
    }
    res.render("teacherSetting", {userRole: role, user: req.user, page})
    

    
    
}
module.exports = {renderSetting, updateTest}