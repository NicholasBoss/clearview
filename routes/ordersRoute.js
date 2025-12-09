// Needed Resources
const express = require("express")
const router = new express.Router()
const ordersController = require("../controllers/ordersController")
const util = require("../utilities")
const ordersValidation = require("../utilities/ordersValidation")
const { check } = require("express-validator")

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
router.get("/viewMirage3500/:id", util.checkLogin, util.handleErrors(ordersController.buildViewMirage3500))
router.get("/editMirage3500/:id", util.checkLogin, util.handleErrors(ordersController.editMirage3500))
router.post("/completeMirage3500/:id", util.checkLogin, util.handleErrors(ordersController.completeMirage3500))

router.get("/createMirage", util.checkLogin, util.handleErrors(ordersController.buildCreateMirage))
router.post("/confirmMirage",
    util.checkLogin,
    ordersValidation.mirageRules(),
    ordersValidation.checkMirageData,
    util.handleErrors(ordersController.processMirageForm))
router.get("/confirmMirage", util.checkLogin, util.handleErrors(ordersController.buildConfirmMirage))
router.post("/saveMirage", util.checkLogin, util.handleErrors(ordersController.saveMirageOrder))
router.get("/viewMirage/:id", util.checkLogin, util.handleErrors(ordersController.buildViewMirage))
router.get("/editMirage/:id", util.checkLogin, util.handleErrors(ordersController.editMirage))
router.post("/completeMirage/:id", util.checkLogin, util.handleErrors(ordersController.completeMirage))

router.get("/createRainier", util.checkLogin, util.handleErrors(ordersController.buildCreateRainier))
router.post("/confirmRainier",
    util.checkLogin,
    ordersValidation.rainierRules(),
    ordersValidation.checkRainierData,
    util.handleErrors(ordersController.processRainierForm))
router.get("/confirmRainier", util.checkLogin, util.handleErrors(ordersController.buildConfirmRainier))
router.post("/saveRainier", util.checkLogin, util.handleErrors(ordersController.saveRainierOrder))
router.get("/viewRainier/:id", util.checkLogin, util.handleErrors(ordersController.buildViewRainier))
router.get("/editRainier/:id", util.checkLogin, util.handleErrors(ordersController.editRainier))
router.post("/completeRainier/:id", util.checkLogin, util.handleErrors(ordersController.completeRainier))

router.get("/createNWS", util.checkLogin, util.handleErrors(ordersController.buildCreateNWS))
router.post("createNWS", util,util.checkLogin, util.handleErrors(ordersController.processNWSForm))
router.get("/confirmNWS", util.checkLogin, util.handleErrors(ordersController.buildConfirmNWS))
router.get("/viewNWS/:id", util.checkLogin, util.handleErrors(ordersController.buildViewNWS))
router.get("/editNWS/:id", util.checkLogin, util.handleErrors(ordersController.editNWS))
router.post("/completeNWS/:id", util.checkLogin, util.handleErrors(ordersController.completeNWS))

router.post("/create", util.checkLogin, util.handleErrors(ordersController.insertProduct))
router.get("/customer", util.checkLogin, util.handleErrors(ordersController.buildCreateCustomer))
router.post("/customer", util.checkLogin, util.handleErrors(ordersController.saveCustomer))

// Export
module.exports = router