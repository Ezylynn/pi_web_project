const express = require('express');
const {renderInstruction} = require("../controllers/instructionController")
const instructionRouter = express.Router();


instructionRouter.get("/instruction", renderInstruction);


module.exports = {instructionRouter}