const express = require('express');
const rootRouter = express.Router();
const {homeRouter} = require("./home");
const {infoRouter} = require("./info");
const {instructionRouter} = require("./instruction")
const {leaderboardRouter} = require("./leaderboard");

const {signInRouter} = require("./signIn")
const {testRouter} = require("./test")


rootRouter.use("/", homeRouter, infoRouter, instructionRouter, leaderboardRouter, signInRouter, testRouter)

module.exports = {rootRouter}