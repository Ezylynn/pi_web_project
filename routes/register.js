const express = require('express');
const {renderRegister, createUser} = require("../controllers/registerController")
const registerRouter = express.Router();
const {checkAuthenticated, checkNotAuthenticated, checkRole, ensureUniqueAccount} = require("../middleware/checkAuthenticated")

registerRouter.get("/register", checkNotAuthenticated, renderRegister);

registerRouter.post("/register", checkNotAuthenticated, ensureUniqueAccount("email", "username"), createUser)





module.exports = {registerRouter}