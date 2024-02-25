const {renderSetting, updateTest} = require("../controllers/teacherSettingController")
const express = require('express');
const {checkAuthenticated, checkNotAuthenticated, checkRole, enhancedCheckRole} = require("../middleware/checkAuthenticated")
const teacherSettingRouter = express.Router();

teacherSettingRouter.get("/:userRole/setting/:page", checkAuthenticated, enhancedCheckRole("student"), renderSetting);
teacherSettingRouter.post("/:userRole/setting/:page", checkAuthenticated, enhancedCheckRole("student"), updateTest);


module.exports = {teacherSettingRouter}