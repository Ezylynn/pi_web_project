const express = require('express');
const {renderInfo} = require("../controllers/infoController")
const {checkAuthenticated, checkNotAuthenticated, checkRole} = require("../middleware/checkAuthenticated")
const infoRouter = express.Router();


infoRouter.get("/teacher/info/:userId",checkAuthenticated,checkRole("teacher"), renderInfo);


module.exports = {infoRouter}