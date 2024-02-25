const {Student} = require("../models/students_info")
const {rankingPiAnswers} = require("../utils/piCalculate")
const {convertISO} = require("../utils/getAttemptTime")
const { sortByClass, sortById, sortByName, sortByScore} = require("../utils/sort")
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

const sortLeaderboard = async (req,res) => {
    const {role} = req.user;
    const {sortType, state} = req.body;
    console.log(sortType)
    console.log(state)
    
    let userInfo = await Student.fetchEssentials();
    userInfo = userInfo.filter(user => user.role === "student")
    
    
    let userInfoUpdated = await rankingPiAnswers(userInfo);
    userInfoUpdated.map(userInfo => {
        userInfo.attempted_at = convertISO(userInfo.attempted_at)
    })

    if(state){

        switch (sortType){
            case "grade":
                userInfoUpdated = sortByClass(userInfoUpdated);
                break;
            case "score":
                userInfoUpdated = sortByScore(userInfoUpdated);
                
                break;
            case "full_name": 
                userInfoUpdated = sortByName(userInfoUpdated);
                break;
        }
    }
    
    
    

  
  
  res.render("partials/leaderboardTable", {studentRank: userInfoUpdated}, function(err, html) {
    if (err) {
        console.error(err);
        res.status(500).send('Error rendering leaderboard');
    } else {
       
        // Send back only the rendered HTML fragment for the leaderboard table, not an entire document.
        res.send(html);
        
    }
})

}

module.exports = {renderLeaderboard, sortLeaderboard}