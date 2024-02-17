const express = require('express');
const {renderHome} = require("../controllers/homeController")
const {checkAuthenticated, checkNotAuthenticated, checkRole} = require("../middleware/checkAuthenticated")
const homeRouter = express.Router();


homeRouter.get("/:userRole/home", checkAuthenticated, checkRole, renderHome);


module.exports = {homeRouter}