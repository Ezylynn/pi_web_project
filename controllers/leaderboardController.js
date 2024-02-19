const {Student} = require("../models/students_info")
const {rankingPiAnswers} = require("../utils/piCalculate")
const renderLeaderboard = async (req,res) => {
    const {userRole} = req.params;
    let userInfo = await Student.fetchEssentials();
    // console.log(userInfo)
    
    let userInfoUpdated = await rankingPiAnswers(userInfo);
    
    console.log(userInfoUpdated)
    

    res.render("leaderboard", {userRole, user: req.user, studentRank: userInfoUpdated})
}

module.exports = {renderLeaderboard}