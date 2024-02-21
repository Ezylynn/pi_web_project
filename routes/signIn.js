const express = require('express');
const {renderSignIn, logOut} = require("../controllers/signInController");

const {checkAuthenticated, checkNotAuthenticated, checkRole} = require("../middleware/checkAuthenticated")
const {passport} = require("../config/passportConfig")

const signInRouter = express.Router();





signInRouter.get("/sign-in",checkNotAuthenticated, renderSignIn);

signInRouter.post("/sign-in", checkNotAuthenticated, passport.authenticate('local', {failureFlash: false, failureRedirect: "/api/v1/sign-in"}), (req,res) => {
    
    res.redirect(`/api/v1/${req.user.role}/home`)
})

signInRouter.delete("/:userRole/log-out", logOut )

module.exports = {signInRouter}