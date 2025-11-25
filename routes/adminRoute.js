// Needed Resources 
const express = require("express")
const router = new express.Router() 
const adminController = require("../controllers/adminController")
const util = require("../utilities")

// Routes

// Admin Orders Route
router.get("/orders", util.checkLogin, util.checkAdmin, adminController.buildAdmin)

module.exports = router