const express = require('express');
const {renderRegister, createUser} = require("../controllers/registerController")
const registerRouter = express.Router();
const {checkAuthenticated, checkNotAuthenticated, checkRole} = require("../middleware/checkAuthenticated")

registerRouter.get("/register", checkNotAuthenticated, renderRegister);

registerRouter.post("/register", createUser)





module.exports = {registerRouter}