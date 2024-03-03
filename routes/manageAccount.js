const express = require('express');
const {renderAccount, updateAccount} = require("../controllers/manageAccountController")
const {checkAuthenticated, checkNotAuthenticated, checkRole, enhancedCheckRole} = require("../middleware/checkAuthenticated")
const manageAccountRouter = express.Router();


manageAccountRouter.get("/:userRole/manage-account", checkAuthenticated, checkRole("superadmin"), renderAccount);
manageAccountRouter.post("/:userRole/manage-account", checkAuthenticated, checkRole("superadmin"), updateAccount);



module.exports = {manageAccountRouter}