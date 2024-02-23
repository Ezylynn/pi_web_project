const {Student} = require("../models/students_info")
const {rankingPiAnswers} = require("../utils/piCalculate")
const {convertISO} = require("../utils/getAttemptTime")
const renderLeaderboard = async (req,res) => {
    const {role} = req.user;
    
    let userInfo = await Student.fetchEssentials();
    userInfo = userInfo.filter(user => user.role === "student")
    
    
    let userInfoUpdated = await rankingPiAnswers(userInfo);
    userInfoUpdated.map(userInfo => {
        userInfo.attempted_at = convertISO(userInfo.attempted_at)
    })
    
    
    

    res.render("leaderboard", {userRole: role, user: req.user, studentRank: userInfoUpdated})
}

module.exports = {renderLeaderboard}