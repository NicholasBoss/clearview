// Needed Resources
const express = require("express")
const router = new express.Router()
const ordersController = require("../controllers/ordersController")
const util = require("../utilities")
const ordersValidation = require("../utilities/ordersValidation")

// Orders CRUD Routes
router.get("/create", util.checkLogin, util.handleErrors(ordersController.buildCreate))
router.get("/read", util.checkLogin, util.handleErrors(ordersController.buildRead))
router.get("/update", util.checkLogin, util.handleErrors(ordersController.buildUpdate))
router.get("/delete", util.checkLogin, util.handleErrors(ordersController.buildDelete))

router.get("/createMirage3500", util.checkLogin, util.handleErrors(ordersController.buildCreateMirage3500))
router.post("/confirmMirage3500",
    util.checkLogin,
    ordersValidation.mirage3500Rules(),
    ordersValidation.checkMirage3500Data,
    util.handleErrors(ordersController.processMirage3500Form))
router.get("/confirmMirage3500", util.checkLogin, util.handleErrors(ordersController.buildConfirmMirage3500))
router.post("/saveMirage3500", util.checkLogin, util.handleErrors(ordersController.saveMirage3500Order))

router.get("/createMirage", util.checkLogin, util.handleErrors(ordersController.buildCreateMirage))
router.get("/confirmMirage", util.checkLogin, util.handleErrors(ordersController.buildConfirmMirage))

router.get("/createRainier", util.checkLogin, util.handleErrors(ordersController.buildCreateRainier))
router.get("/confirmRainier", util.checkLogin, util.handleErrors(ordersController.buildConfirmRainier))

router.get("/createNWS", util.checkLogin, util.handleErrors(ordersController.buildCreateNWS))
router.get("/confirmNWS", util.checkLogin, util.handleErrors(ordersController.buildConfirmNWS))

router.post("/create", util.checkLogin, util.handleErrors(ordersController.insertProduct))

// Export
module.exports = router