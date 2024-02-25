const express = require('express');
const rootRouter = express.Router();
const {homeRouter} = require("./home");
const {infoRouter} = require("./info");
const {instructionRouter} = require("./instruction")
const {leaderboardRouter} = require("./leaderboard");
const {resultRouter} = require("./result")
const {signInRouter} = require("./signIn")
const {testRouter} = require("./test")
const {registerRouter} = require("./register")
const {teacherSettingRouter} = require("./setting")
const {manageAccountRouter} = require("./manageAccount")
const {superAdminLoginRouter} = require("./superAdminLogin")


rootRouter.use("/", homeRouter, infoRouter, instructionRouter, leaderboardRouter, signInRouter, testRouter, resultRouter, registerRouter, teacherSettingRouter, manageAccountRouter, superAdminLoginRouter)

module.exports = {rootRouter}