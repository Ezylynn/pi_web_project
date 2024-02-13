const express = require('express');
const {redirectToCheat, renderCheat} = require("../controllers/resultController")
const resultRouter = express.Router();

resultRouter.get("/result/suspended", renderCheat)
resultRouter.post("/result/suspended", redirectToCheat);


module.exports = {resultRouter}