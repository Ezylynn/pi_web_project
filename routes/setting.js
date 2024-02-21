const {renderSetting, updateTest} = require("../controllers/teacherSettingController")
const express = require('express');
const {checkAuthenticated, checkNotAuthenticated, checkRole} = require("../middleware/checkAuthenticated")
const teacherSettingRouter = express.Router();

teacherSettingRouter.get("/teacher/setting/:page", checkAuthenticated, checkRole("teacher"), renderSetting);
teacherSettingRouter.post("/teacher/setting/:page/:section", checkAuthenticated, checkRole("teacher"), updateTest);


module.exports = {teacherSettingRouter}