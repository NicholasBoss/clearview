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
    const buildouts = await ordersModel.getBuildouts()
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
        buildouts: buildouts || [],
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

        // Get account_id from logged-in user
        const account_id = res.locals.accountData.account_id

        // Save to database with is_estimate=true
        const result = await ordersModel.saveMirage3500Data(req.body, account_id)

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
    const buildouts = await ordersModel.getBuildouts()
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
        buildouts: buildouts || [],
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

    // Check for validation errors and form data in session
    let errors = null
    let formData = {}
    
    if (req.session.validationErrors) {
        // Wrap errors in an object with array() method to match express-validator interface expected by view
        errors = { array: () => req.session.validationErrors }
        formData = req.session.formData
        
        // Clear from session
        delete req.session.validationErrors
        delete req.session.formData
    }

    res.render('orders/createMirage', {
        title: 'Create Mirage order',
        link: 'orders/createMirage',
        errors: errors,
        colors: colors,
        pivot_colors: pivot_colors,
        top_adapters: top_adapter,
        top_adapter_colors: top_adapter_colors,
        bottom_adapters: bottom_adapter,
        bottom_adapter_colors: bottom_adapter_colors,
        formData: formData,
        build_outs: buildout,
        meshes: ["Charcoal 18x14"],
        mohairs: mohair,
        mohair_positions: mohair_positions,
        fractions: measurements
    })
}

ordersController.processMirageForm = async function(req, res){
    try {
        console.log('========== PROCESS MIRAGE FORM ==========')
        console.log('Form body received:', JSON.stringify(req.body, null, 2))
        
        // Store form data in session for confirm page - DO NOT save to DB yet
        req.session.mirageData = req.body
        
        console.log('Mirage form data stored in session, redirecting to confirm page')
        res.redirect('/orders/confirmMirage')
    } catch (error) {
        console.error('Error processing Mirage form:', error)
        req.flash('error', 'Failed to process order. Please try again.')
        res.redirect('/orders/createMirage')
    }
}

ordersController.buildConfirmMirage = async function(req, res){
    const formData = req.session.mirageData || {}
    
    console.log('========== BUILD CONFIRM MIRAGE ==========')
    console.log('Session mirageData:', JSON.stringify(formData, null, 2))
    
    res.render('orders/confirmMirage', {
        title: 'Confirm Mirage order',
        link: 'orders/confirmMirage',
        errors: null,
        formData: formData
    })
}

ordersController.saveMirageOrder = async function(req, res){
    try {
        console.log('========== SAVE MIRAGE ORDER START ==========')
        
        // Get form data from session
        const formData = req.session.mirageData
        console.log('Form data from session:', formData)
        
        if (!formData) {
            console.log('ERROR: No form data in session!')
            throw new Error('No order data found. Please start over.')
        }
        
        // Get account_id from logged-in user
        const account_id = res.locals.accountData.account_id
        console.log('Account ID:', account_id)
        
        // NOW save to database
        console.log('Calling saveMirageData...')
        const result = await ordersModel.saveMirageData(formData, account_id)
        
        console.log('Mirage Order saved to database, customization_id:', result.customization_id)
        console.log('========== SAVE MIRAGE ORDER SUCCESS ==========')
        
        // Clear session data
        delete req.session.mirageData
        delete req.session.mirageOrderId
        
        req.flash('notice', 'Mirage order confirmed successfully!')
        res.redirect('/account')
    } catch (error) {
        console.log('========== SAVE MIRAGE ORDER FAILED ==========')
        console.error('Error details:', error.message)
        console.error('Full error:', error)
        req.flash('error', 'Failed to save Mirage order. Please try again.')
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
        const buildouts = await ordersModel.getBuildouts()
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
            buildouts: buildouts || [],
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

// Mirage (regular) controllers
ordersController.buildViewMirage = async function(req, res){
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
        const buildouts = await ordersModel.getBuildouts()
        const meshTypes = await ordersModel.getMeshTypes()
        const mohairOptions = await ordersModel.getMohair()
        const mohairPositions = await ordersModel.getMohairPositions()
        const pivotProColors = await ordersModel.getPivotProColors()
        const rightBuildouts = await ordersModel.getRightBuildouts()
        const leftBuildouts = await ordersModel.getLeftBuildouts()

        res.render('account/viewMirage', {
            title: 'View Mirage Order',
            link: 'account/viewMirage',
            errors: null,
            formData: orderData,
            fractions: fractions || [],
            colors: colors || [],
            handles: handles || [],
            topAdapters: topAdapters || [],
            bottomAdapters: bottomAdapters || [],
            buildouts: buildouts || [],
            meshTypes: meshTypes || [],
            mohairOptions: mohairOptions || [],
            mohairPositions: mohairPositions || [],
            pivotProColors: pivotProColors || [],
            rightBuildouts: rightBuildouts || [],
            leftBuildouts: leftBuildouts || []
        })
    } catch (error) {
        console.error('Error loading order:', error)
        req.flash('error', 'Failed to load order details')
        res.redirect('/account')
    }
}

ordersController.editMirage = async function(req, res){
    try {
        const customizationId = req.params.id
        req.flash('notice', 'Editing for Mirage orders is not yet implemented.')
        res.redirect('/account')
    } catch (error) {
        console.error('Error loading order for editing:', error)
        req.flash('error', 'Failed to load order for editing')
        res.redirect('/account')
    }
}

ordersController.completeMirage = async function(req, res){
    try {
        const customizationId = req.params.id
        await ordersModel.completeOrder(customizationId)
        req.flash('notice', 'Mirage order marked as complete successfully!')
        res.redirect('/account')
    } catch (error) {
        console.error('Error completing order:', error)
        req.flash('error', 'Failed to complete order. Please try again.')
        res.redirect('/account')
    }
}

// Rainier controllers
ordersController.buildViewRainier = async function(req, res){
    try {
        const customizationId = req.params.id
        const orderData = await ordersModel.getOrderById(customizationId)

        if (!orderData) {
            req.flash('error', 'Order not found')
            return res.redirect('/account')
        }

        // Get all dropdown options for Rainier
        const fractions = await ordersModel.getMeasurements()
        const placement = await ordersModel.getRainierPlacements()
        const colors = await ordersModel.getRainierColors()
        const rainierFabricColors = await ordersModel.getRainierFabricColors()
        const housing = await ordersModel.getHousingSeries()
        const driveSide = await ordersModel.getDriveSides()
        const hembar = await ordersModel.getHembars()
        const pilebrush = await ordersModel.getPileBrushes()
        const brushLocation = await ordersModel.getBrushLocations()
        const zipperColor = await ordersModel.getZipperColors()
        const cordLength = await ordersModel.getCordLengths()
        const mountTypes = await ordersModel.getMountTypes()
        const leftTrack = await ordersModel.getLeftTracks()
        const rightTrack = await ordersModel.getTracks()
        const leftBuildout = await ordersModel.getLeftBuildouts()
        const rightBuildout = await ordersModel.getRightBuildouts()

        res.render('account/viewRainier', {
            title: 'View Rainier Order',
            link: 'account/viewRainier',
            errors: null,
            formData: orderData,
            fractions: fractions || [],
            placement: placement || [],
            colors: colors || [],
            rainierFabricColors: rainierFabricColors || [],
            housing: housing || [],
            driveSide: driveSide || [],
            hembar: hembar || [],
            pilebrush: pilebrush || [],
            brushLocation: brushLocation || [],
            zipperColor: zipperColor || [],
            cordLength: cordLength || [],
            mountTypes: mountTypes || [],
            leftTrack: leftTrack || [],
            rightTrack: rightTrack || [],
            leftBuildout: leftBuildout || [],
            rightBuildout: rightBuildout || []
        })
    } catch (error) {
        console.error('Error loading order:', error)
        req.flash('error', 'Failed to load order details')
        res.redirect('/account')
    }
}

ordersController.editRainier = async function(req, res){
    try {
        const customizationId = req.params.id
        req.flash('notice', 'Editing for Rainier orders is not yet implemented.')
        res.redirect('/account')
    } catch (error) {
        console.error('Error loading order for editing:', error)
        req.flash('error', 'Failed to load order for editing')
        res.redirect('/account')
    }
}

ordersController.completeRainier = async function(req, res){
    try {
        const customizationId = req.params.id
        await ordersModel.completeOrder(customizationId)
        req.flash('notice', 'Rainier order marked as complete successfully!')
        res.redirect('/account')
    } catch (error) {
        console.error('Error completing order:', error)
        req.flash('error', 'Failed to complete order. Please try again.')
        res.redirect('/account')
    }
}

// NWS controllers
ordersController.buildViewNWS = async function(req, res){
    try {
        const customizationId = req.params.id
        const orderData = await ordersModel.getOrderById(customizationId)

        if (!orderData) {
            req.flash('error', 'Order not found')
            return res.redirect('/account')
        }

        // Get all dropdown options for NWS
        const jaOrdersModel = require('../models/jaOrdersModel')
        const colors = await ordersModel.getColorsByProduct("New Window Screen")
        const mesh = await ordersModel.getMeshByProduct("New Window Screen")
        const measurements = await ordersModel.getMeasurements("New Window Screen")
        const frame_sizes = await jaOrdersModel.getFrameSizes("New Window Screen")
        const fasteners = await jaOrdersModel.getFasteners("New Window Screen")
        const springs = await jaOrdersModel.getTabSpring("New Window Screen")

        res.render('account/viewNWS', {
            title: 'View NWS Order',
            link: 'account/viewNWS',
            errors: null,
            formData: orderData,
            colors: colors || [],
            frame_sizes: frame_sizes || [],
            fractions: measurements || [],
            springs: springs || [],
            meshs: mesh || [],
            fasteners: fasteners || []
        })
    } catch (error) {
        console.error('Error loading order:', error)
        req.flash('error', 'Failed to load order details')
        res.redirect('/account')
    }
}

ordersController.editNWS = async function(req, res){
    try {
        const customizationId = req.params.id
        req.flash('notice', 'Editing for NWS orders is not yet implemented.')
        res.redirect('/account')
    } catch (error) {
        console.error('Error loading order for editing:', error)
        req.flash('error', 'Failed to load order for editing')
        res.redirect('/account')
    }
}

ordersController.completeNWS = async function(req, res){
    try {
        const customizationId = req.params.id
        await ordersModel.completeOrder(customizationId)
        req.flash('notice', 'NWS order marked as complete successfully!')
        res.redirect('/account')
    } catch (error) {
        console.error('Error completing order:', error)
        req.flash('error', 'Failed to complete order. Please try again.')
        res.redirect('/account')
    }
}


module.exports = ordersController