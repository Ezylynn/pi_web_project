const express = require('express');
const {renderTest, getTime} = require("../controllers/testController")
const testRouter = express.Router();
const {checkAuthenticated, checkNotAuthenticated, checkRole} = require("../middleware/checkAuthenticated")


testRouter.get("/student/test/:test/:userId", checkAuthenticated, checkRole("student"), renderTest);

testRouter.post("/student/test/:test/:userId", checkAuthenticated, checkRole("student"), getTime)




module.exports = {testRouter}