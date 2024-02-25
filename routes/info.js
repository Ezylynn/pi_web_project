const express = require('express');
const {renderInfo} = require("../controllers/infoController")
const {checkAuthenticated, checkNotAuthenticated, checkRole, enhancedCheckRole} = require("../middleware/checkAuthenticated")
const infoRouter = express.Router();


infoRouter.get("/:userRole/info/:userId", checkAuthenticated, enhancedCheckRole("student"), renderInfo);


module.exports = {infoRouter}