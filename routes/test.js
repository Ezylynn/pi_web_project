const express = require('express');
const {renderTest, finishTest} = require("../controllers/testController")
const testRouter = express.Router();


testRouter.get("/test", renderTest);

testRouter.post("/test", finishTest)


module.exports = {testRouter}