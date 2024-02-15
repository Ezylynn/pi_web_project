const express = require('express');
const {renderRegister} = require("../controllers/registerController")
const registerRouter = express.Router();

registerRouter.get("/register", renderRegister)





module.exports = {registerRouter}