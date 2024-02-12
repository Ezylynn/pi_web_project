const express = require('express');
const {renderInstruction} = require("../controllers/instructionController")
const instructionRouter = express.Router();


instructionRouter.get("/instruction", instructionRouter);


module.exports = {instructionRouter}