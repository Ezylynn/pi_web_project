const express = require('express');
const {renderSignIn} = require("../controllers/signInController")
const signInRouter = express.Router();


signInRouter.get("/home", renderSignIn);


module.exports = {signInRouter}