const express = require('express');
const {redirectToCheat, renderResult} = require("../controllers/resultController")
const resultRouter = express.Router();

resultRouter.get("/result/:status", renderResult)
resultRouter.post("/result/:status", redirectToCheat);


module.exports = {resultRouter}