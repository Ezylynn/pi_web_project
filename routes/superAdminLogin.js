const express = require('express');
const {superAdminLogOut, renderSuperAdminLogin} = require("../controllers/superAdminLoginController");

const {checkAuthenticated, checkNotAuthenticated, checkRole} = require("../middleware/checkAuthenticated")
const {passport} = require("../config/passportConfig")

const superAdminLoginRouter = express.Router();





superAdminLoginRouter.get("/superadmin/login", checkNotAuthenticated, renderSuperAdminLogin);

superAdminLoginRouter.post("/superadmin/login", checkNotAuthenticated, passport.authenticate('local', {failureFlash: false, failureRedirect: "/api/v1/superadmin/login"}), (req,res) => {
    
    res.redirect(`/api/v1/superadmin/home`)
})

// superAdminLoginRouter.delete("/superadmin/log-out" ,superAdminLogOut)

module.exports = {superAdminLoginRouter }