const express = require('express');
const {renderLeaderboard, sortLeaderboard} = require("../controllers/leaderboardController")
const leaderboardRouter = express.Router();
const {checkAuthenticated, checkNotAuthenticated, checkRole} = require("../middleware/checkAuthenticated")


leaderboardRouter.get("/teacher/leaderboard",  checkAuthenticated, checkRole("teacher"), renderLeaderboard);

leaderboardRouter.post("/teacher/leaderboard", checkAuthenticated, checkRole("teacher"), sortLeaderboard  )

module.exports = {leaderboardRouter}