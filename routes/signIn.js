const express = require('express');
const {renderSignIn} = require("../controllers/signInController")
const signInRouter = express.Router();


signInRouter.get("/sign-in", renderSignIn);


module.exports = {signInRouter}