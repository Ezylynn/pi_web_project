const {Test} = require("../models/pi_test")

const renderSetting = (req,res) => {
    const {role} = req.user
    const {page} = req.params;

    res.render("teacherSetting", {userRole: role, user: req.user, page})
}

const updateTest = (req,res) => {
    const {section} = req.params;
    if (section === "time"){
        const {test_date, start_time, end_time, test_naame} = req.body;
    }

    
    
}
module.exports = {renderSetting, updateTest}