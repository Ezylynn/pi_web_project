const express = require('express');
const {redirectToCheat, renderResult, processResult} = require("../controllers/resultController")
const resultRouter = express.Router();
const {checkAuthenticated, checkNotAuthenticated, checkRole, checkId} = require("../middleware/checkAuthenticated")

resultRouter.get("/student/:test/result/:status/:userId", checkAuthenticated, checkRole("student"), checkId, renderResult)
resultRouter.post("/student/:test/result/:status/:userId", checkAuthenticated, checkRole("student"), checkId, processResult);


module.exports = {resultRouter}