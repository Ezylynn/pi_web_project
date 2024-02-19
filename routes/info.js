const express = require('express');
const {renderInfo} = require("../controllers/infoController")
const {checkAuthenticated, checkNotAuthenticated, checkRole} = require("../middleware/checkAuthenticated")
const infoRouter = express.Router();


infoRouter.get("/:userRole/info/:userId",checkAuthenticated,checkRole, renderInfo);


module.exports = {infoRouter}