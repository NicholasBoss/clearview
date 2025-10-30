const { body, validationResult } = require('express-validator');
const validate = {}

/* *************************************
* Mirage 3500 Order Validation Rules
************************************** */
validate.mirage3500Rules = () => {
    return [
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
        .escape(),

        // Bottom Level - required
        body("bottom_level")
        .notEmpty()
        .withMessage("Bottom Level is required.")
        .trim()
        .escape(),

        // Left Plumb - required
        body("left_plumb")
        .notEmpty()
        .withMessage("Left Plumb is required.")
        .trim()
        .escape(),

        // Right Plumb - required
        body("right_plumb")
        .notEmpty()
        .withMessage("Right Plumb is required.")
        .trim()
        .escape(),

        // Starting Point - required
        body("starting_point")
        .notEmpty()
        .withMessage("Starting Point is required.")
        .trim()
        .escape(),

        // Mount - required
        body("mount")
        .notEmpty()
        .withMessage("Mount is required.")
        .trim()
        .escape(),

        // Color - required
        body("color_name")
        .notEmpty()
        .withMessage("Please select a color.")
        .trim()
        .escape(),

        // Handle - required
        body("handle")
        .notEmpty()
        .withMessage("Please select a handle type.")
        .trim()
        .escape(),

        // Handle Color - required
        body("handle_color")
        .notEmpty()
        .withMessage("Please select a handle color.")
        .trim()
        .escape(),

        // Top Adapter - required
        body("top_adapter")
        .notEmpty()
        .withMessage("Top Adapter is required.")
        .trim()
        .escape(),

        // Top Adapter Color - required
        body("top_adapter_color")
        .notEmpty()
        .withMessage("Top Adapter Color is required.")
        .trim()
        .escape(),

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
        .trim()
        .escape(),

        // Bottom Adapter Color - required
        body("btm_adapter_color")
        .notEmpty()
        .withMessage("Bottom Adapter Color is required.")
        .trim()
        .escape(),

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

        // Right Build Out - required
        body("right_build_out")
        .notEmpty()
        .withMessage("Right Build Out is required.")
        .trim()
        .escape(),

        // Left Build Out - required
        body("left_build_out")
        .notEmpty()
        .withMessage("Left Build Out is required.")
        .trim()
        .escape(),

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
        .trim()
        .escape(),

        // Mohair - required
        body("mohair")
        .notEmpty()
        .withMessage("Mohair is required.")
        .isIn(['.200 MoHair X.187', '.250 MoHair X.187', '.300 MoHair X.187', '.350 MoHair X.187'])
        .withMessage("Invalid mohair selected."),

        // Mohair Position - required
        body("mohair_position")
        .notEmpty()
        .withMessage("Mohair Position is required.")
        .isIn(['Edge', 'Inside'])
        .withMessage("Invalid mohair position selected."),

        // Mohair Size - required
        body("mohair_size")
        .notEmpty()
        .withMessage("Mohair Size is required.")
        .isIn(['.2', '.25', '.3', '.35'])
        .withMessage("Invalid mohair size selected."),

        // Bumper Pads - required
        body("bumper_pads")
        .notEmpty()
        .withMessage("Bumper Pads is required.")
        .trim()
        .escape(),

        // Silicone Spray - required
        body("silicone_spray")
        .notEmpty()
        .withMessage("Silicone Spray is required.")
        .trim()
        .escape(),

        // Wholesale Price - required numeric
        body("wholesale_price")
        .notEmpty()
        .withMessage("Wholesale Price is required.")
        .trim()
        .isNumeric()
        .withMessage("Wholesale Price must be a number."),

        // Markup Multiplier - required
        body("markup_multiplier")
        .notEmpty()
        .withMessage("Markup Multiplier is required.")
        .isIn(['2', '1.9', '1.8'])
        .withMessage("Invalid markup multiplier selected."),

        // Retail Price - required numeric
        body("retail_price")
        .notEmpty()
        .withMessage("Retail Price is required.")
        .trim()
        .isNumeric()
        .withMessage("Retail Price must be a number."),

        // Custom Add-ons - required
        body("custom_addons")
        .notEmpty()
        .withMessage("Custom Add-ons is required.")
        .trim()
        .escape(),

        // PIA Obstacles Helper - required
        body("pia_obstacles_helper")
        .notEmpty()
        .withMessage("PIA Obstacles Helper is required.")
        .trim()
        .escape(),

        // Date Sold - optional (can be empty)
        body("date_sold")
        .optional({ checkFalsy: true })
        .isISO8601()
        .withMessage("Invalid date format."),

        // QC Tech Date - required
        body("qc_tech_date")
        .notEmpty()
        .withMessage("QC Tech Date is required.")
        .trim()
        .escape()
    ]
}

/* *********************************************************
* Check data and return errors or continue to confirmation
********************************************************** */
validate.checkMirage3500Data = async (req, res, next) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log('Validation errors found:', errors.array())

        // Store errors and form data in session
        req.session.validationErrors = errors.array()
        req.session.formData = req.body

        // Redirect back to the create form (POST/Redirect/GET pattern)
        res.redirect('/orders/createMirage3500')
        return
    }
    next()
}

module.exports = validate
