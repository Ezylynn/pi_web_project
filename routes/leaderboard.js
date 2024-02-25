const express = require('express');
const {renderLeaderboard, sortLeaderboard} = require("../controllers/leaderboardController")
const leaderboardRouter = express.Router();
const {checkAuthenticated, checkNotAuthenticated, checkRole, enhancedCheckRole} = require("../middleware/checkAuthenticated")


leaderboardRouter.get("/:userRole/leaderboard",  checkAuthenticated, enhancedCheckRole("student"), renderLeaderboard);

leaderboardRouter.post("/:userRole/leaderboard", checkAuthenticated, enhancedCheckRole("student"), sortLeaderboard  )

module.exports = {leaderboardRouter}