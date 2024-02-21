const express = require('express');
const {redirectToCheat, renderResult, processResult} = require("../controllers/resultController")
const resultRouter = express.Router();
const {checkAuthenticated, checkNotAuthenticated, checkRole} = require("../middleware/checkAuthenticated")

resultRouter.get("/student/result/:status/:userId", checkAuthenticated, checkRole("student"), renderResult)
resultRouter.post("/student/result/:status/:userId", checkAuthenticated, checkRole("student"), processResult);


module.exports = {resultRouter}