const { body, validationResult } = require('express-validator');
const ordersModel = require('../models/ordersModel')
const validate = {}

/* *************************************
* Mirage 3500 Order Validation Rules
************************************** */
validate.mirage3500Rules = () => {
    return [
        // Customer First Name - required
        body("customer_firstname")
        .notEmpty()
        .withMessage("Customer First Name is required.")
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage("Customer First Name must be between 1 and 255 characters.")
        .matches(/^[a-zA-Z\s\-']+$/)
        .withMessage("Customer First Name can only contain letters, spaces, hyphens, and apostrophes."),

        // Customer Last Name - required
        body("customer_lastname")
        .notEmpty()
        .withMessage("Customer Last Name is required.")
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage("Customer Last Name must be between 1 and 255 characters.")
        .matches(/^[a-zA-Z\s\-']+$/)
        .withMessage("Customer Last Name can only contain letters, spaces, hyphens, and apostrophes."),

        // Top Opening Width - required numeric field
        body("top_opening_width")
        .notEmpty()
        .withMessage("Top Opening Width is required.")
        .trim()
        .isNumeric()
        .withMessage("Top Opening Width must be a number."),

        // Top Opening Width Fraction - required
        body("top_opening_width_fraction")
        .notEmpty()
        .withMessage("Top Opening Width Fraction is required."),

        // Middle Opening Width - required numeric
        body("middle_opening_width")
        .notEmpty()
        .withMessage("Middle Opening Width is required.")
        .trim()
        .isNumeric()
        .withMessage("Middle Opening Width must be a number."),

        // Middle Opening Width Fraction - required
        body("middle_opening_width_fraction")
        .notEmpty()
        .withMessage("Middle Opening Width Fraction is required."),

        // Bottom Opening Width - required numeric
        body("bottom_opening_width")
        .notEmpty()
        .withMessage("Bottom Opening Width is required.")
        .trim()
        .isNumeric()
        .withMessage("Bottom Opening Width must be a number."),

        // Bottom Opening Width Fraction - required
        body("bottom_opening_width_fraction")
        .notEmpty()
        .withMessage("Bottom Opening Width Fraction is required."),

        // Left Opening Height - required numeric
        body("left_opening_height")
        .notEmpty()
        .withMessage("Left Opening Height is required.")
        .trim()
        .isNumeric()
        .withMessage("Left Opening Height must be a number."),

        // Left Opening Height Fraction - required
        body("left_opening_height_fraction")
        .notEmpty()
        .withMessage("Left Opening Height Fraction is required."),

        // Middle Opening Height - required numeric
        body("middle_opening_height")
        .notEmpty()
        .withMessage("Middle Opening Height is required.")
        .trim()
        .isNumeric()
        .withMessage("Middle Opening Height must be a number."),

        // Middle Opening Height Fraction - required
        body("middle_opening_height_fraction")
        .notEmpty()
        .withMessage("Middle Opening Height Fraction is required."),

        // Right Opening Height - required numeric
        body("right_opening_height")
        .notEmpty()
        .withMessage("Right Opening Height is required.")
        .trim()
        .isNumeric()
        .withMessage("Right Opening Height must be a number."),

        // Right Opening Height Fraction - required
        body("right_opening_height_fraction")
        .notEmpty()
        .withMessage("Right Opening Height Fraction is required."),

        // Top Level - required
        body("top_level")
        .notEmpty()
        .withMessage("Top Level is required.")
        .trim()
,

        // Bottom Level - required
        body("bottom_level")
        .notEmpty()
        .withMessage("Bottom Level is required.")
        .trim()
,

        // Left Plumb - required
        body("left_plumb")
        .notEmpty()
        .withMessage("Left Plumb is required.")
        .trim()
,

        // Right Plumb - required
        body("right_plumb")
        .notEmpty()
        .withMessage("Right Plumb is required.")
        .trim()
,

        // Starting Point - required
        body("starting_point")
        .notEmpty()
        .withMessage("Starting Point is required.")
        .trim()
,

        // Mount - required
        body("mount")
        .notEmpty()
        .withMessage("Mount is required.")
        .trim()
,

        // Door Type - required
        body("door_type")
        .notEmpty()
        .withMessage("Door Type is required.")
        .trim(),

        // Door Mount - required
        body("door_mount")
        .notEmpty()
        .withMessage("Door Mount is required.")
        .trim(),

        // Opening Side - required
        body("opening_side")
        .notEmpty()
        .withMessage("Opening Side is required.")
        .trim(),

        // Color - required
        body("color_name")
        .notEmpty()
        .withMessage("Please select a color.")
        .trim()
,

        // Handle - required
        body("handle")
        .notEmpty()
        .withMessage("Please select a handle type.")
        .trim(),

        // Handle Color - required
        body("handle_color")
        .notEmpty()
        .withMessage("Please select a handle color.")
        .trim(),

        // Top Adapter - required
        body("top_adapter")
        .notEmpty()
        .withMessage("Top Adapter is required.")
        .trim(),

        // Top Adapter Color - required
        body("top_adapter_color")
        .notEmpty()
        .withMessage("Top Adapter Color is required.")
        .trim()
,

        // Top Adapter Width - required numeric
        body("top_adapter_width")
        .notEmpty()
        .withMessage("Top Adapter Width is required.")
        .trim()
        .isNumeric()
        .withMessage("Top Adapter Width must be a number."),

        // Top Adapter Width Fraction - required
        body("top_adapter_width_fraction")
        .notEmpty()
        .withMessage("Top Adapter Width Fraction is required."),

        // Unit Height - required numeric
        body("unit_height")
        .notEmpty()
        .withMessage("Unit Height is required.")
        .trim()
        .isNumeric()
        .withMessage("Unit Height must be a number."),

        // Unit Height Fraction - required
        body("unit_height_fraction")
        .notEmpty()
        .withMessage("Unit Height Fraction is required."),

        // Pivot Pro Height - required numeric
        body("pivot_pro_height")
        .notEmpty()
        .withMessage("Pivot Pro Height is required.")
        .trim()
        .isNumeric()
        .withMessage("Pivot Pro Height must be a number."),

        // Pivot Pro Height Fraction - required
        body("pivot_pro_height_fraction")
        .notEmpty()
        .withMessage("Pivot Pro Height Fraction is required."),

        // Bottom Adapter - required
        body("btm_adapter")
        .notEmpty()
        .withMessage("Bottom Adapter is required.")
        .trim(),

        // Bottom Adapter Color - required
        body("bottom_adapter_color_id")
        .notEmpty()
        .withMessage("Bottom Adapter Color is required.")
        .trim()
,

        // Bottom Adapter Width - required numeric
        body("btm_adapter_width")
        .notEmpty()
        .withMessage("Bottom Adapter Width is required.")
        .trim()
        .isNumeric()
        .withMessage("Bottom Adapter Width must be a number."),

        // Bottom Adapter Width Fraction - required
        body("btm_adapter_width_fraction")
        .notEmpty()
        .withMessage("Bottom Adapter Width Fraction is required."),

        // Build Out - required
        body("buildout")
        .notEmpty()
        .withMessage("Build Out is required.")
        .trim(),

        // Build Out Dimension - required numeric
        body("build_out_dimension")
        .notEmpty()
        .withMessage("Build Out Dimension is required.")
        .trim()
        .isNumeric()
        .withMessage("Build Out Dimension must be a number."),

        // Build Out Dimension Fraction - required
        body("build_out_dimension_fraction")
        .notEmpty()
        .withMessage("Build Out Dimension Fraction is required."),

        // Mesh - required
        body("mesh")
        .notEmpty()
        .withMessage("Please select a mesh type.")
        .trim(),

        // Mohair - required
        body("mohair")
        .notEmpty()
        .withMessage("Mohair is required.")
        .trim(),

        // Mohair Position - required
        body("mohair_position")
        .notEmpty()
        .withMessage("Mohair Position is required.")
        .trim(),

        // Mohair Size - optional (not used yet)
        // body("mohair_size")
        // .optional({ checkFalsy: true })
        // .isIn(['.2', '.25', '.3', '.35'])
        // .withMessage("Invalid mohair size selected."),

        // Bumper Pads - optional (not used yet)
        body("bumper_pads")
        .optional({ checkFalsy: true })
        .trim()
,

        // Silicone Spray - optional (not used yet)
        body("silicone_spray")
        .optional({ checkFalsy: true })
        .trim()
,

        // Wholesale Price - optional (not used yet)
        body("wholesale_price")
        .optional({ checkFalsy: true })
        .trim()
        .isNumeric()
        .withMessage("Wholesale Price must be a number."),

        // Markup Multiplier - optional (not used yet)
        body("markup_multiplier")
        .optional({ checkFalsy: true })
        .isIn(['2', '1.9', '1.8'])
        .withMessage("Invalid markup multiplier selected."),

        // Retail Price - optional (not used yet)
        body("retail_price")
        .optional({ checkFalsy: true })
        .trim()
        .isNumeric()
        .withMessage("Retail Price must be a number."),

        // Custom Add-ons - optional (not used yet)
        body("custom_addons")
        .optional({ checkFalsy: true })
        .trim()
,

        // PIA Obstacles Helper - optional (not used yet)
        body("pia_obstacles_helper")
        .optional({ checkFalsy: true })
        .trim()
,

        // Date Sold - optional (can be empty)
        body("date_sold")
        .optional({ checkFalsy: true })
        .isISO8601()
        .withMessage("Invalid date format."),

        // QC Tech Date - optional (not used yet)
        body("qc_tech_date")
        .optional({ checkFalsy: true })
        .trim()
         
    ]
}

/* *************************************
* Mirage Order Validation Rules
************************************** */
validate.mirageRules = () => {
    return [
        // Customer First Name - required
        body("customer_firstname")
        .notEmpty()
        .withMessage("Customer First Name is required.")
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage("Customer First Name must be between 1 and 255 characters."),

        // Customer Last Name - required
        body("customer_lastname")
        .notEmpty()
        .withMessage("Customer Last Name is required.")
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage("Customer Last Name must be between 1 and 255 characters."),

        // Color - required
        body("color_name")
        .notEmpty()
        .withMessage("Color is required.")
        .trim(),

        // Pivot Pro Color - required
        body("pivot_pro_color")
        .notEmpty()
        .withMessage("Pivot Pro Color is required.")
        .trim(),

        // Top Adapter - required
        body("top_adapter")
        .notEmpty()
        .withMessage("Top Adapter is required.")
        .trim(),

        // Top Adapter Color - required
        body("top_adapter_color")
        .notEmpty()
        .withMessage("Top Adapter Color is required.")
        .trim(),

        // Top Adapter Width - required numeric
        body("top_adapter_width")
        .notEmpty()
        .withMessage("Top Adapter Width is required.")
        .trim()
        .isNumeric()
        .withMessage("Top Adapter Width must be a number."),

        // Top Adapter Width Fraction - required
        body("top_adapter_width_fraction")
        .notEmpty()
        .withMessage("Top Adapter Width Fraction is required."),

        // Opening Height - required numeric
        body("opening_height")
        .notEmpty()
        .withMessage("Opening Height is required.")
        .trim()
        .isNumeric()
        .withMessage("Opening Height must be a number."),

        // Opening Height Fraction - required
        body("opening_height_fraction")
        .notEmpty()
        .withMessage("Opening Height Fraction is required."),

        // Unit Height - required numeric
        body("unit_height")
        .notEmpty()
        .withMessage("Unit Height is required.")
        .trim()
        .isNumeric()
        .withMessage("Unit Height must be a number."),

        // Unit Height Fraction - required
        body("unit_height_fraction")
        .notEmpty()
        .withMessage("Unit Height Fraction is required."),

        // Pivot Pro Height - required numeric
        body("pivot_pro_height")
        .notEmpty()
        .withMessage("Pivot Pro Height is required.")
        .trim()
        .isNumeric()
        .withMessage("Pivot Pro Height must be a number."),

        // Pivot Pro Height Fraction - required
        body("pivot_pro_height_fraction")
        .notEmpty()
        .withMessage("Pivot Pro Height Fraction is required."),

        // Bottom Adapter - required
        body("btm_adapter")
        .notEmpty()
        .withMessage("Bottom Adapter is required.")
        .trim(),

        // Bottom Adapter Color - required
        body("bottom_adapter_color")
        .notEmpty()
        .withMessage("Bottom Adapter Color is required.")
        .trim(),

        // Bottom Adapter Width - required numeric
        body("btm_adapter_width")
        .notEmpty()
        .withMessage("Bottom Adapter Width is required.")
        .trim()
        .isNumeric()
        .withMessage("Bottom Adapter Width must be a number."),

        // Bottom Adapter Width Fraction - required
        body("btm_adapter_width_fraction")
        .notEmpty()
        .withMessage("Bottom Adapter Width Fraction is required."),

        // Build Out - required
        body("build_out")
        .notEmpty()
        .withMessage("Build Out is required.")
        .trim(),

        // Build Out Dimension - required numeric
        body("build_out_dimension")
        .notEmpty()
        .withMessage("Build Out Dimension is required.")
        .trim()
        .isNumeric()
        .withMessage("Build Out Dimension must be a number."),

        // Build Out Dimension Fraction - required
        body("build_out_dimension_fraction")
        .notEmpty()
        .withMessage("Build Out Dimension Fraction is required."),

        // Mesh - required
        body("mesh")
        .notEmpty()
        .withMessage("Mesh is required.")
        .trim(),

        // Mohair - required
        body("mohair")
        .notEmpty()
        .withMessage("Mohair is required.")
        .trim(),

        // Mohair Position - required
        body("mohair_position")
        .notEmpty()
        .withMessage("Mohair Position is required.")
        .trim(),

        // Bumper Pads - optional (not used yet)
        body("bumper_pads")
        .optional({ checkFalsy: true })
        .trim()
    ]
}

/* *********************************************************
* Check data and return errors or continue to confirmation
********************************************************** */
validate.checkMirage3500Data = async (req, res, next) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log('Validation errors found:', errors.array())

        const fractions = await ordersModel.getMeasurements()
        const colors = await ordersModel.getColors()
        const handles = await ordersModel.getHandles()
        const topAdapters = await ordersModel.getTopAdapters()
        const bottomAdapters = await ordersModel.getBottomAdapters()
        const buildouts = await ordersModel.getBuildouts()
        const meshTypes = await ordersModel.getMeshTypes()
        const mohairOptions = await ordersModel.getMohair()
        const mohairPositions = await ordersModel.getMohairPositions()
        const customers = await ordersModel.getAllCustomers()

        // Store errors and form data in session
        req.session.validationErrors = errors.array()
        req.session.formData = req.body

        // Redirect back to the create form (POST/Redirect/GET pattern)
        res.render('orders/createMirage3500', {
                errors,
                title: 'Create Mirage 3500 Order',
                link: 'orders/createMirage3500',
                formData: req.body,
                fractions,
                colors,
                handles,
                topAdapters,
                bottomAdapters,
                buildouts,
                meshTypes,
                mohairOptions,
                mohairPositions,
                customers
        })
        return
    }
    next()
}

/* *********************************************************
* Check data and return errors or continue to confirmation
********************************************************** */
validate.checkMirageData = async (req, res, next) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log('Validation errors found:', errors.array())

        const colors = await ordersModel.getColorsByProduct("Mirage")
        const pivot_colors = await ordersModel.getPivotColorsByProduct("Mirage")
        const top_adapter_colors = await ordersModel.getTopAdapterColor("Mirage")
        const bottom_adapter_colors = await ordersModel.getBottomAdapterColor("Mirage")
        const top_adapters = await ordersModel.getTopAdapters()
        const bottom_adapters = await ordersModel.getBottomAdapters()
        const build_outs = await ordersModel.getBuildOut()
        const mohairs = await ordersModel.getMohair()
        const mohair_positions = await ordersModel.getMohairPositions()
        const fractions = await ordersModel.getMeasurements()

        // Store errors and form data in session
        req.session.validationErrors = errors.array()
        req.session.formData = req.body

        // Redirect back to the create form (POST/Redirect/GET pattern)
        res.render('orders/createMirage', {
                errors,
                title: 'Create Mirage Order',
                link: 'orders/createMirage',
                formData: req.body
                , colors
                , pivot_colors
                , top_adapter_colors
                , bottom_adapter_colors
                , bottom_adapters
                , mohair_positions
                , fractions
                , top_adapters
                , mohairs
                , fractions
                , build_outs

        })
        return
    }
    next()
}

/* *********************************************************
* Rainier Validation Rules
********************************************************** */
validate.rainierRules = () => {
    return [
        // Customer First Name - required
        body("customer_firstname")
        .notEmpty()
        .withMessage("Customer First Name is required.")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Customer First Name must be at least 1 character."),

        // Customer Last Name - required
        body("customer_lastname")
        .notEmpty()
        .withMessage("Customer Last Name is required.")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Customer Last Name must be at least 1 character."),

        // Placement - required
        body("rainier_placement")
        .notEmpty()
        .withMessage("Placement is required."),

        body("rainier_color")
        .notEmpty()
        .withMessage("Color is required."),

        // Fabric & Color - required
        body("fabric_color")
        .notEmpty()
        .withMessage("Fabric & Color is required."),

        body("housing_series")
        .notEmpty()
        .withMessage("Housing Series is required."),

        body("drive_side")
        .notEmpty()
        .withMessage("Drive Side is required."),

        body("hembar_name")
        .notEmpty()
        .withMessage("Hembar is required."),

        body("pile_brush")
        .notEmpty()
        .withMessage("Pile Brush is required."),

        body("brush_location")
        .notEmpty()
        .withMessage("Brush Location is required."),

        body("zipper_color")
        .notEmpty()
        .withMessage("Zipper Color is required."),

        body("cord_length")
        .notEmpty()
        .withMessage("Cord Length is required."),

        body("mount_type")
        .notEmpty()
        .withMessage("Mount Type is required."),

        body("top_opening_width")
        .notEmpty()
        .withMessage("Top Opening Width is required.")
        .trim()
        .isNumeric()
        .withMessage("Top Opening Width must be a number."),

        // Top Opening Width Fraction - required
        body("top_opening_width_inch")
        .notEmpty()
        .withMessage("Top Opening Width Inch is required."),

        // Top Level - required
        body("top_level")
        .notEmpty()
        .withMessage("Top Level is required.")
        .trim(),

        // Bottom Opening Width - required numeric
        body("bottom_opening_width")
        .notEmpty()
        .withMessage("Bottom Opening Width is required.")
        .trim()
        .isNumeric()
        .withMessage("Bottom Opening Width must be a number."),

        // Bottom Opening Width Fraction - required
        body("bottom_opening_width_inch")
        .notEmpty()
        .withMessage("Bottom Opening Width Inch is required."),

        // Bottom Level - required
        body("bottom_level")
        .notEmpty()
        .withMessage("Bottom Level is required.")
        .trim(),

        // Left Opening Height - required numeric
        body("left_opening_height")
        .notEmpty()
        .withMessage("Left Opening Height is required.")
        .trim()
        .isNumeric()
        .withMessage("Left Opening Height must be a number."),

        // Left Opening Height Fraction - required
        body("left_opening_height_inch")
        .notEmpty()
        .withMessage("Left Opening Height Inch is required."),

        // Left Plumb - required
        body("left_plumb")
        .notEmpty()
        .withMessage("Left Plumb is required.")
        .trim(),

        // Right Opening Height - required numeric
        body("right_opening_height")
        .notEmpty()
        .withMessage("Right Opening Height is required.")
        .trim()
        .isNumeric()
        .withMessage("Right Opening Height must be a number."),

        // Right Opening Height Fraction - required
        body("right_opening_height_inch")
        .notEmpty()
        .withMessage("Right Opening Height Inch is required."),

        // Right Plumb - required
        body("right_plumb")
        .notEmpty()
        .withMessage("Right Plumb is required.")
        .trim(),

        // Left Build Out - required
        body("left_build_out")
        .notEmpty()
        .withMessage("Left Build Out is required."),

        // Right Build Out - required
        body("right_build_out")
        .notEmpty()
        .withMessage("Right Build Out is required."),

        // Add Build Out - required
        body("add_build_out")
        .notEmpty()
        .withMessage("Add Build Out is required.")
        .trim(),

        // Left Track - required
        body("left_track")
        .notEmpty()
        .withMessage("Left Track is required."),

        // Right Track - required
        body("right_track")
        .notEmpty()
        .withMessage("Right Track is required."),

        // Order Type - required
        body("order_type")
        .notEmpty()
        .withMessage("Order Type is required.")
    ]
}

/* *********************************************************
* Check Rainier data and return errors or continue to confirmation
********************************************************** */
validate.checkRainierData = async (req, res, next) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log('Validation errors found:', errors.array())

        // Store errors and form data in session
        req.session.validationErrors = errors.array()
        req.session.formData = req.body

        // Redirect back to the create form (POST/Redirect/GET pattern)
        res.redirect('/orders/createRainier')
        return
    }
    next()
}

/* *************************************
* NWS (New Window Screen) Validation Rules
************************************** */
validate.nwsRules = () => {
    return [
        // Customer First Name - required
        body("customer_firstname")
        .notEmpty()
        .withMessage("Customer First Name is required.")
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage("Customer First Name must be between 1 and 255 characters.")
        .matches(/^[a-zA-Z\s\-']+$/)
        .withMessage("Customer First Name can only contain letters, spaces, hyphens, and apostrophes."),

        // Customer Last Name - required
        body("customer_lastname")
        .notEmpty()
        .withMessage("Customer Last Name is required.")
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage("Customer Last Name must be between 1 and 255 characters.")
        .matches(/^[a-zA-Z\s\-']+$/)
        .withMessage("Customer Last Name can only contain letters, spaces, hyphens, and apostrophes."),

        // Quantity - required numeric
        body("quantity")
        .notEmpty()
        .withMessage("Quantity is required.")
        .trim()
        .isInt({ min: 1 })
        .withMessage("Quantity must be a whole number greater than 0."),

        // Frame Size - required
        body("frame_size")
        .notEmpty()
        .withMessage("Frame Size is required.")
        .trim(),

        // Color - required
        body("color")
        .notEmpty()
        .withMessage("Color is required.")
        .trim(),

        // Mesh - required
        body("mesh")
        .notEmpty()
        .withMessage("Mesh is required.")
        .trim(),

        // Fastener - required
        body("fastener")
        .notEmpty()
        .withMessage("Fastener is required.")
        .trim(),

        // Spring - required
        body("spring")
        .notEmpty()
        .withMessage("Spring is required.")
        .trim(),

        // Fastener Location - optional
        body("fastener_location")
        .optional({ checkFalsy: true })
        .trim(),

        // Notes - optional
        body("notes")
        .optional({ checkFalsy: true })
        .trim(),

        // Width - required numeric
        body("width_input")
        .notEmpty()
        .withMessage("Width is required.")
        .trim()
        .isNumeric()
        .withMessage("Width must be a number."),

        // Width Fraction - required
        body("measurement_name")
        .notEmpty()
        .withMessage("Width Fraction is required."),

        // Width +/- - required
        body("width_plus_minus")
        .notEmpty()
        .withMessage("Width +/- is required.")
        .isIn(['+', '-'])
        .withMessage("Width +/- must be + or -."),

        // Height - required numeric
        body("height_input")
        .notEmpty()
        .withMessage("Height is required.")
        .trim()
        .isNumeric()
        .withMessage("Height must be a number."),

        // Height Fraction - required
        body("height_fraction")
        .notEmpty()
        .withMessage("Height Fraction is required."),

        // Height +/- - required
        body("height_plus_minus")
        .notEmpty()
        .withMessage("Height +/- is required.")
        .isIn(['+', '-'])
        .withMessage("Height +/- must be + or -."),

        // Order Type - required
        body("order_type")
        .notEmpty()
        .withMessage("Order Type is required.")
        .trim()
        .isIn(['Phone Order', 'On-Site Order'])
        .withMessage("Order Type must be Phone Order or On-Site Order.")
    ]
}

/* *********************************************************
* Check NWS data and return errors or continue to confirmation
********************************************************** */
validate.checkNWSData = async (req, res, next) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log('Validation errors found:', errors.array())

        const colors = await ordersModel.getColorsByProduct("New Window Screen")
        const mesh = await ordersModel.getMeshByProduct("New Window Screen")
        const measurements = await ordersModel.getMeasurements("New Window Screen")

        let frame_sizes, fasteners, springs
        try {
            const jaOrdersModel = require('../models/jaOrdersModel')
            frame_sizes = await jaOrdersModel.getFrameSizes("New Window Screen")
            fasteners = await jaOrdersModel.getFasteners("New Window Screen")
            springs = await jaOrdersModel.getTabSpring("New Window Screen")
        } catch (e) {
            console.log('Error loading jaOrdersModel data:', e.message)
            frame_sizes = []
            fasteners = []
            springs = []
        }

        // Store errors and form data in session
        req.session.validationErrors = errors.array()
        req.session.formData = req.body

        // Re-render form with errors and form data
        res.render('orders/createNWS', {
                errors,
                title: 'Create New Window Screen Order',
                link: 'orders/createNWS',
                formData: req.body,
                colors: colors || [],
                frame_sizes: frame_sizes || [],
                fractions: measurements || [],
                springs: springs || [],
                meshs: mesh || [],
                fasteners: fasteners || []
        })
        return
    }
    next()
}

module.exports = validate
