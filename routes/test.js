const express = require('express');
const {renderTest} = require("../controllers/testController")
const testRouter = express.Router();


testRouter.get("/test", renderTest);


module.exports = {testRouter}