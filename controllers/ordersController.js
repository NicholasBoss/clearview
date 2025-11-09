const ordersModel = require('../models/ordersModel')
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
        formData: formData
    })
}
ordersController.processMirage3500Form = async function(req, res){
    try {
        // Store form data in session
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

    // DEBUG: Log form data to see what values we have
    console.log('=== CONFIRM PAGE FORM DATA ===')
    console.log('handle_color:', formData.handle_color)
    console.log('top_adapter:', formData.top_adapter)
    console.log('top_adapter_color:', formData.top_adapter_color)
    console.log('btm_adapter:', formData.btm_adapter)
    console.log('btm_adapter_color:', formData.btm_adapter_color)
    console.log('right_build_out:', formData.right_build_out)
    console.log('left_build_out:', formData.left_build_out)
    console.log('mohair:', formData.mohair)
    console.log('mohair_position:', formData.mohair_position)
    console.log('==============================')

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

    // DEBUG: Log first few values from database
    console.log('=== DATABASE VALUES ===')
    console.log('Sample colors:', colors.slice(0, 3).map(c => c.color_name))
    console.log('Sample topAdapters:', topAdapters.slice(0, 3).map(a => a.top_adapter_name))
    console.log('Sample bottomAdapters:', bottomAdapters.slice(0, 3).map(a => a.bottom_adapter_name))
    console.log('Sample rightBuildouts:', rightBuildouts.slice(0, 3).map(b => b.right_buildout_name))
    console.log('Sample leftBuildouts:', leftBuildouts.slice(0, 3).map(b => b.left_buildout_name))
    console.log('Sample mohair:', mohairOptions.slice(0, 3).map(m => m.mohair_type))
    console.log('Sample mohairPositions:', mohairPositions.map(p => p.mohair_position_name))
    console.log('========================')

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
        mohairPositions: mohairPositions || []
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
    res.render('orders/createMirage', {
        title: 'Create Mirage order',
        link: 'orders/createMirage',
        errors: null
    })
}
ordersController.buildConfirmMirage = async function(req, res){
    res.render('orders/confirmMirage', {
        title: 'Confirm Mirage order',
        link: 'orders/confirmMirage',
        errors: null
    })
}

ordersController.buildCreateRainier = async function(req, res){
    res.render('orders/createRainier', {
        title: 'Create order',
        link: 'orders/createRainier',
        errors: null
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
    res.render('orders/createNWS', {
        title: 'Create order',
        link: 'orders/createNWS',
        errors: null
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