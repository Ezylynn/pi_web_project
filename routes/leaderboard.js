const express = require('express');
const {renderLeaderboard} = require("../controllers/leaderboardController")
const leaderboardRouter = express.Router();
const {checkAuthenticated, checkNotAuthenticated, checkRole} = require("../middleware/checkAuthenticated")


leaderboardRouter.get("/teacher/leaderboard",  checkAuthenticated, checkRole("teacher"), renderLeaderboard);


module.exports = {leaderboardRouter}