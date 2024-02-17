const express = require('express');
const {renderInstruction} = require("../controllers/instructionController")
const instructionRouter = express.Router();
const {checkAuthenticated, checkNotAuthenticated, checkRole} = require("../middleware/checkAuthenticated")


instructionRouter.get("/:userRole/instruction",checkAuthenticated, checkRole, renderInstruction);


module.exports = {instructionRouter}