const express = require('express');
const {renderLeaderboard} = require("../controllers/leaderboardController")
const leaderboardRouter = express.Router();
const {checkAuthenticated, checkNotAuthenticated, checkRole} = require("../middleware/checkAuthenticated")


leaderboardRouter.get("/:userRole/leaderboard",  checkAuthenticated, checkRole, renderLeaderboard);


module.exports = {leaderboardRouter}