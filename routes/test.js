const express = require('express');
const {renderTest, getTime} = require("../controllers/testController")
const testRouter = express.Router();
const {checkAuthenticated, checkNotAuthenticated, checkRole, checkStatus, checkId} = require("../middleware/checkAuthenticated")


testRouter.get("/student/test/:test/:userId", checkAuthenticated, checkRole("student"), checkStatus, checkId, renderTest);

testRouter.post("/student/test/:test/:userId", checkAuthenticated, checkRole("student"), checkStatus, checkId, getTime)




module.exports = {testRouter}