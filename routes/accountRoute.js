// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const accountValidator = require("../utilities/accountValidation")
const util = require("../utilities")

// Routes

// Default Home Route
router.get("/", util.checkLogin, util.handleErrors(accountController.buildAccount))

// Register Route
router.get("/register", util.handleErrors(accountController.buildRegister))

// Register Account
router.post("/register", 
    accountValidator.registrationRules(),
    accountValidator.checkRegData,
    util.handleErrors(accountController.registerAccount))
    
// Process Login Route
router.post("/login", 
    accountValidator.loginRules(),
    accountValidator.checkLoginData,
    util.handleErrors(accountController.accountLogin))

// Logout Route
router.get('/logout', accountController.accountLogout)

// Export
module.exports = router