const ordersModel = require('../models/ordersModel')
const jfOrdersModel = require('../models/jfOrdersModel')
const jaOrdersModel = require('../models/jaOrdersModel')
const ordersController = {}

ordersController.buildCreate = async function(req, res){
    res.render('orders/create', {
        title: 'Create order',
        link: 'orders/create',
        errors: null
    })
}

ordersController.buildUpdate = async function(req, res){
    res.render('orders/update', {
        title: 'Update order',
        link: 'orders/update',
        errors: null
    })
}

ordersController.buildDelete = async function(req, res){
    res.render('orders/delete', {
        title: 'Delete order',
        link: 'orders/delete',
        errors: null
    })
}

// This function will fire when the user CONFIRMS the order
ordersController.createOrder = async function(req, res){
    const { product_name, measurement_name, size_type, fastener_type, color_name, mesh_type, mirage_build_out, mirage_3500_handle } = req.body
    console.log('Creating order')
    try {
        const order = await ordersModel.createOrder(
            product_name,
            measurement_name,
            size_type,
            fastener_type,
            color_name,
            mesh_type,
            mirage_build_out,
            mirage_3500_handle
        )
    } catch (error) {
        console.log('Error creating order:', error);
    }
}

// This function will fire when the user CREATES the product order
ordersController.insertProduct = async function(req, res){
    const { product_name, measurement_name, size_type, fastener_type, color_name, mesh_type, mirage_build_out, mirage_3500_handle } = req.body
    console.log('Inserting product')
    console.log(req.body)
    // console.log('Product Name:', product_name);
    // console.log('Measurement Name:', measurement_name);
    // console.log('Size Type:', size_type);
    // console.log('Fastener Type:', fastener_type);
    // console.log('Color Name:', color_name);
    // console.log('Mesh Type:', mesh_type);
    // console.log('Mirage Build Out:', mirage_build_out);
    // console.log('Mirage 3500 Handle:', mirage_3500_handle);
    try {
        // const product = await ordersModel.insertProduct(
        //     product_name,
        //     measurement_name,
        //     size_type,
        //     fastener_type,
        //     color_name,
        //     mesh_type,
        //     mirage_build_out,
        //     mirage_3500_handle
        // )
        console.log('Inserting product into database...')
        // load the /account page
        res.redirect('/account')
    } catch (error) {
        console.log('Error inserting product:', error);
    }
}



// individual order creation functions
ordersController.buildCreateMirage3500 = async function(req, res){
    const fractions = await ordersModel.getMeasurements()
    const colors = await ordersModel.getColors()
    const handles = await ordersModel.getHandles()
    const topAdapters = await ordersModel.getTopAdapters()
    const bottomAdapters = await ordersModel.getBottomAdapters()
    const rightBuildouts = await ordersModel.getRightBuildouts()
    const leftBuildouts = await ordersModel.getLeftBuildouts()
    const meshTypes = await ordersModel.getMeshTypes()
    const mohairOptions = await ordersModel.getMohair()
    const mohairPositions = await ordersModel.getMohairPositions()
    const customers = await ordersModel.getAllCustomers()

    // Check for validation errors from session (POST/Redirect/GET pattern)
    let errors = null
    let formData = {}

    if (req.session.validationErrors) {
        // Store in local variables before clearing session
        const validationErrors = req.session.validationErrors
        const sessionFormData = req.session.formData || {}

        // Clear the session data
        delete req.session.validationErrors
        delete req.session.formData

        // Convert error array back to validationResult format
        errors = {
            array: () => validationErrors
        }
        formData = sessionFormData
    }

    res.render('orders/createMirage3500', {
        title: 'Create Mirage 3500 order',
        link: 'orders/createMirage3500',
        errors: errors,
        fractions: fractions || [],
        colors: colors || [],
        handles: handles || [],
        topAdapters: topAdapters || [],
        bottomAdapters: bottomAdapters || [],
        rightBuildouts: rightBuildouts || [],
        leftBuildouts: leftBuildouts || [],
        meshTypes: meshTypes || [],
        mohairOptions: mohairOptions || [],
        mohairPositions: mohairPositions || [],
        customers: customers || [],
        formData: formData
    })
}
ordersController.processMirage3500Form = async function(req, res){
    try {
        // Store form data in session for confirm page
        req.session.mirage3500Data = req.body

        // Save to database with is_estimate=true
        const result = await ordersModel.saveMirage3500Data(req.body)

        // Store customization_id in session to prevent duplicate inserts
        req.session.mirage3500OrderId = result.customization_id

        console.log('Order created with is_estimate=true, customization_id:', result.customization_id)

        res.redirect('/orders/confirmMirage3500')
    } catch (error) {
        console.error('Error processing Mirage 3500 form:', error)
        req.flash('error', 'Failed to save order. Please try again.')
        res.redirect('/orders/createMirage3500')
    }
}

ordersController.buildConfirmMirage3500 = async function(req, res){
    const formData = req.session.mirage3500Data || {}

    const fractions = await ordersModel.getMeasurements()
    const colors = await ordersModel.getColors()
    const handles = await ordersModel.getHandles()
    const topAdapters = await ordersModel.getTopAdapters()
    const bottomAdapters = await ordersModel.getBottomAdapters()
    const rightBuildouts = await ordersModel.getRightBuildouts()
    const leftBuildouts = await ordersModel.getLeftBuildouts()
    const meshTypes = await ordersModel.getMeshTypes()
    const mohairOptions = await ordersModel.getMohair()
    const mohairPositions = await ordersModel.getMohairPositions()
    const customers = await ordersModel.getAllCustomers()

    res.render('orders/confirmMirage3500', {
        title: 'Confirm Mirage 3500 order',
        link: 'orders/confirmMirage3500',
        errors: null,
        formData: formData,
        fractions: fractions || [],
        colors: colors || [],
        handles: handles || [],
        topAdapters: topAdapters || [],
        bottomAdapters: bottomAdapters || [],
        rightBuildouts: rightBuildouts || [],
        leftBuildouts: leftBuildouts || [],
        meshTypes: meshTypes || [],
        mohairOptions: mohairOptions || [],
        mohairPositions: mohairPositions || [],
        customers: customers || []
    })
}

ordersController.saveMirage3500Order = async function(req, res){
    try {
        // Get customization_id from session
        const customizationId = req.session.mirage3500OrderId

        if (!customizationId) {
            throw new Error('No order found to confirm. Please start over.')
        }

        // Update order to set is_confirmed=true, is_estimate=false
        const result = await ordersModel.confirmMirage3500Order(customizationId)

        // Clear session data
        delete req.session.mirage3500Data
        delete req.session.mirage3500OrderId

        console.log('Order confirmed successfully, customization_id:', customizationId)

        // Set success message
        req.flash('success', 'Mirage 3500 order confirmed successfully!')

        // Redirect to account page or orders list
        res.redirect('/account')
    } catch (error) {
        console.error('Error confirming Mirage 3500 order:', error)
        req.flash('error', 'Failed to confirm Mirage 3500 order. Please try again.')
        res.redirect('/orders/confirmMirage3500')
    }
}

ordersController.buildCreateMirage = async function(req, res){
    colors = await ordersModel.getColorsByProduct("Mirage")
    pivot_colors = await ordersModel.getPivotColorsByProduct("Mirage")
    top_adapter_colors = await ordersModel.getTopAdapterColor("Mirage")
    bottom_adapter_colors = await ordersModel.getBottomAdapterColor("Mirage")
    top_adapter = await ordersModel.getTopAdapters()
    bottom_adapter = await ordersModel.getBottomAdapters()
    buildout = await ordersModel.getBuildOut()
    mohair = await ordersModel.getMohair()
    mohair_positions = await ordersModel.getMohairPositions()
    measurements = await ordersModel.getMeasurements()
    console.log(top_adapter_colors)

    res.render('orders/createMirage', {
        title: 'Create Mirage order',
        link: 'orders/createMirage',
        errors: null,
        colors: colors,
        pivot_colors: pivot_colors,
        top_adapters: top_adapter,
        top_adapter_colors: top_adapter_colors,
        bottom_adapters: bottom_adapter,
        bottom_adapter_colors: bottom_adapter_colors,
        formData: ["dummy"],
        build_outs: buildout,
        meshes: ["Charcoal 18x14"],
        mohairs: mohair,
        mohair_positions: mohair_positions,
        fractions: measurements
    })
}

ordersController.processMirageForm = async function(req, res){
    try {
        req.session.mirageData = req.body
        const result = await ordersModel.saveMirageData(req.body)
        req.session.mirageOrderId = result.customization_id
        console.log('Mirage Order created with is_estimate=true, customization_id:', result.customization_id)
        res.redirect('/orders/confirmMirage')
    } catch (error) {
        console.error('Error processing Mirage form:', error)
        req.flash('error', 'Failed to save order. Please try again.')
        res.redirect('/orders/createMirage')
    }
}

ordersController.buildConfirmMirage = async function(req, res){
    const formData = req.session.mirageData || {}
    
    const fractions = await ordersModel.getMeasurements()
    const colors = await ordersModel.getColors()
    const pivotProColors = await ordersModel.getPivotProColors()
    const topAdapters = await ordersModel.getTopAdapters()
    const bottomAdapters = await ordersModel.getBottomAdapters()
    const meshTypes = await ordersModel.getMeshTypes()
    const mohairOptions = await ordersModel.getMohair()
    const mohairPositions = await ordersModel.getMohairPositions()
    const customers = await ordersModel.getAllCustomers()

    res.render('orders/confirmMirage', {
        title: 'Confirm Mirage order',
        link: 'orders/confirmMirage',
        errors: null,
        formData: formData,
        fractions: fractions || [],
        colors: colors || [],
        pivotProColors: pivotProColors || [],
        topAdapters: topAdapters || [],
        bottomAdapters: bottomAdapters || [],
        meshTypes: meshTypes || [],
        mohairOptions: mohairOptions || [],
        mohairPositions: mohairPositions || [],
        customers: customers || []
    })
}

ordersController.saveMirageOrder = async function(req, res){
    try {
        const customizationId = req.session.mirageOrderId
        if (!customizationId) {
            throw new Error('No order found to confirm. Please start over.')
        }
        await ordersModel.confirmMirageOrder(customizationId)
        delete req.session.mirageData
        delete req.session.mirageOrderId
        console.log('Mirage Order confirmed successfully, customization_id:', customizationId)
        req.flash('success', 'Mirage order confirmed successfully!')
        res.redirect('/account')
    } catch (error) {
        console.error('Error confirming Mirage order:', error)
        req.flash('error', 'Failed to confirm Mirage order. Please try again.')
        res.redirect('/orders/confirmMirage')
    }
}

ordersController.buildCreateRainier = async function(req, res){
    const placement = await jfOrdersModel.getPlacement()
    const colors = await ordersModel.getColors()
    const housing = await jfOrdersModel.getHousing()
    const driveSide = await jfOrdersModel.getdriveSide()
    const hembar = await jfOrdersModel.gethembar()
    const pilebrush = await jfOrdersModel.getpilebrush()
    const brushLocation = await jfOrdersModel.getbrushLocation()
    const zipperColor = await jfOrdersModel.getzipperColor()
    const cordLength = await jfOrdersModel.getcordLength()
    const mountTypes = await jfOrdersModel.getmountTypes()
    const fractions = await ordersModel.getMeasurements()
    const leftBuildout = await jfOrdersModel.getleftBuildout()
    const rightBuildout = await jfOrdersModel.getrightBuildout()
    const leftTrack = await jfOrdersModel.getleftTrack()
    const rightTrack = await jfOrdersModel.getrightTrack()
    const rainierFabricColors = await ordersModel.getRainierFabricColors()

    // Check for validation errors from session (POST/Redirect/GET pattern)
    let errors = null
    let formData = {}

    if (req.session.validationErrors) {
        // Store in local variables before clearing session
        const validationErrors = req.session.validationErrors
        const sessionFormData = req.session.formData || {}

        // Clear the session data
        delete req.session.validationErrors
        delete req.session.formData

        // Convert error array back to validationResult format
        errors = {
            array: () => validationErrors
        }
        formData = sessionFormData
    }

    res.render('orders/createRainier', {
        title: 'Create Rainier Order',
        link: 'orders/createRainier',
        errors: null,
        formData: formData,
        placement: placement || [],
        rainierFabricColors: rainierFabricColors || [],
        colors: colors || [],
        housing: housing || [],
        driveSide: driveSide || [],
        hembar: hembar || [],
        pilebrush: pilebrush || [],
        brushLocation: brushLocation || [],
        zipperColor: zipperColor || [],
        cordLength: cordLength || [],
        mountTypes: mountTypes || [],
        fractions: fractions || [],
        leftBuildout: leftBuildout || [],
        rightBuildout: rightBuildout || [],
        leftTrack: leftTrack || [],
        rightTrack: rightTrack || []

    })
}
ordersController.buildConfirmRainier = async function(req, res){
    res.render('orders/confirmRainier', {
        title: 'Confirm order',
        link: 'orders/confirmRainier',
        errors: null
    })
}

ordersController.buildCreateNWS = async function(req, res){
    colors = await ordersModel.getColorsByProduct("New Window Screen")
    mesh = await ordersModel.getMeshByProduct("New Window Screen")
    measurements = await ordersModel.getMeasurements("New Window Screen")
    frame_sizes = await jaOrdersModel.getFrameSizes("New Window Screen")
    fasteners = await jaOrdersModel.getFasteners("New Window Screen")
    springs = await jaOrdersModel.getTabSpring("New Window Screen")

    res.render('orders/createNWS', {
        title: 'Create order',
        link: 'orders/createNWS',
        errors: null,
        colors: colors || [],
        frame_sizes: frame_sizes || [],
        fractions: measurements || [],
        springs: springs || [],
        meshs: mesh || [],
        fasteners: fasteners || [],
        formData: {}
    })
}
ordersController.buildConfirmNWS = async function(req, res){
    res.render('orders/confirmNWS', {
        title: 'Confirm order',
        link: 'orders/confirmNWS',
        errors: null
    })
}

ordersController.buildViewMirage3500 = async function(req, res){
    try {
        const customizationId = req.params.id
        const orderData = await ordersModel.getOrderById(customizationId)

        if (!orderData) {
            req.flash('error', 'Order not found')
            return res.redirect('/account')
        }

        // Get all dropdown options
        const fractions = await ordersModel.getMeasurements()
        const colors = await ordersModel.getColors()
        const handles = await ordersModel.getHandles()
        const topAdapters = await ordersModel.getTopAdapters()
        const bottomAdapters = await ordersModel.getBottomAdapters()
        const rightBuildouts = await ordersModel.getRightBuildouts()
        const leftBuildouts = await ordersModel.getLeftBuildouts()
        const meshTypes = await ordersModel.getMeshTypes()
        const mohairOptions = await ordersModel.getMohair()
        const mohairPositions = await ordersModel.getMohairPositions()

        res.render('account/viewMirage3500', {
            title: 'View Mirage 3500 Order',
            link: 'account/viewMirage3500',
            errors: null,
            orderData: orderData,
            fractions: fractions || [],
            colors: colors || [],
            handles: handles || [],
            topAdapters: topAdapters || [],
            bottomAdapters: bottomAdapters || [],
            rightBuildouts: rightBuildouts || [],
            leftBuildouts: leftBuildouts || [],
            meshTypes: meshTypes || [],
            mohairOptions: mohairOptions || [],
            mohairPositions: mohairPositions || []
        })
    } catch (error) {
        console.error('Error loading order:', error)
        req.flash('error', 'Failed to load order details')
        res.redirect('/account')
    }
}

// Load existing order for editing and redirect to confirm page
ordersController.editMirage3500 = async function(req, res){
    try {
        const customizationId = req.params.id
        const orderData = await ordersModel.getOrderById(customizationId)

        if (!orderData) {
            req.flash('error', 'Order not found')
            return res.redirect('/account')
        }

        // Store order data in session so confirmMirage3500 can display it
        req.session.mirage3500Data = orderData
        req.session.mirage3500OrderId = customizationId

        // Redirect to confirm page (which is editable)
        res.redirect('/orders/confirmMirage3500')
    } catch (error) {
        console.error('Error loading order for editing:', error)
        req.flash('error', 'Failed to load order for editing')
        res.redirect('/account')
    }
}

// Complete Mirage 3500 order (set is_completed = TRUE)
ordersController.completeMirage3500 = async function(req, res){
    try {
        const customizationId = req.params.id

        if (!customizationId) {
            req.flash('error', 'Invalid order ID')
            return res.redirect('/account')
        }

        // Update order to set is_completed = TRUE
        await ordersModel.completeMirage3500Order(customizationId)

        req.flash('notice', 'Order marked as complete successfully!')
        res.redirect('/account')
    } catch (error) {
        console.error('Error completing order:', error)
        req.flash('error', 'Failed to complete order. Please try again.')
        res.redirect('/account')
    }
}


module.exports = ordersController