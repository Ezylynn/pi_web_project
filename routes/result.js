const express = require('express');
const {redirectToCheat, renderResult} = require("../controllers/resultController")
const resultRouter = express.Router();
const {checkAuthenticated, checkNotAuthenticated, checkRole} = require("../middleware/checkAuthenticated")

resultRouter.get("/:userRole/result/:status", checkAuthenticated, checkRole, renderResult)
resultRouter.post("/:userRole/result/:status", checkAuthenticated, checkRole, redirectToCheat);


module.exports = {resultRouter}