const express = require('express');
const {renderTest, finishTest} = require("../controllers/testController")
const testRouter = express.Router();
const {checkAuthenticated, checkNotAuthenticated, checkRole} = require("../middleware/checkAuthenticated")


testRouter.get("/student/test/:userId", checkAuthenticated, checkRole("student"), renderTest);




module.exports = {testRouter}