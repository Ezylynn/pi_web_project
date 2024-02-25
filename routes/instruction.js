const express = require('express');
const {renderInstruction} = require("../controllers/instructionController")
const instructionRouter = express.Router();
const {checkAuthenticated, checkNotAuthenticated, checkRole, enhancedCheckRole} = require("../middleware/checkAuthenticated")


instructionRouter.get("/student/instruction",checkAuthenticated, checkRole("student"), renderInstruction);


module.exports = {instructionRouter}