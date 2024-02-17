const renderLeaderboard = (req,res) => {
    const {userRole} = req.params;
    res.render("leaderboard", {userRole, user: req.user})
}

module.exports = {renderLeaderboard}