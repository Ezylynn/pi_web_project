const express = require('express');
const {renderLeaderboard} = require("../controllers/leaderboardController")
const leaderboardRouter = express.Router();


leaderboardRouter.get("/leaderboard", renderLeaderboard);


module.exports = {leaderboardRouter}