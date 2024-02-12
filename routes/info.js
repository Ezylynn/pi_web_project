const express = require('express');
const {renderInfo} = require("../controllers/infoController")
const infoRouter = express.Router();


infoRouter.get("/info", renderInfo);


module.exports = {infoRouter}