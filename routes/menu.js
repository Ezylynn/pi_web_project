const express = require('express');
const {renderMenu} = require("../controllers/menuController")
const menuRouter = express.Router();


menuRouter.get("/home",renderMenu);


module.exports = {menuRouter}