const {Student} = require("../models/students_info")
const {rankingPiAnswers} = require("../utils/piCalculate")
const {convertISO} = require("../utils/getAttemptTime")

const renderInfo = async (req,res) => {
    const {userId} = req.params;
    const {role} = req.user;
    
    
    let usersInfo = await Student.fetchEssentials();
    let usersInfoUpdated = await rankingPiAnswers(usersInfo);
    usersInfoUpdated.forEach(data => {
        data.created_at = convertISO(data.created_at)
    })
    const userInfo = usersInfoUpdated.filter(user => parseInt(user.student_id) == userId)
    
    
    
    
    res.render("info", {userRole: role, user: req.user, student: userInfo})
}

module.exports = {renderInfo}