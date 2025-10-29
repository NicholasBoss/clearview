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
    res.render('orders/createMirage3500', {
        title: 'Create Mirage 3500 order',
        link: 'orders/createMirage3500',
        errors: null,
        fractions: fractions || []
    })
}
ordersController.processMirage3500Form = async function(req, res){
    // Store form data in session
    req.session.mirage3500Data = req.body
    res.redirect('/orders/confirmMirage3500')
}

ordersController.buildConfirmMirage3500 = async function(req, res){
    const formData = req.session.mirage3500Data || {}
    const fractions = await ordersModel.getMeasurements()
    res.render('orders/confirmMirage3500', {
        title: 'Confirm Mirage 3500 order',
        link: 'orders/confirmMirage3500',
        errors: null,
        formData: formData,
        fractions: fractions || []
    })
}

ordersController.saveMirage3500Order = async function(req, res){
    try {
        // Get form data from session
        const formData = req.session.mirage3500Data || {}

        // Save all the data (INSERT or SELECT as needed)
        const result = await ordersModel.saveMirage3500Data(formData)

        // Clear session data
        delete req.session.mirage3500Data

        // Set success message
        req.flash('success', 'Mirage 3500 order created successfully!')

        // Redirect to account page or orders list
        res.redirect('/account')
    } catch (error) {
        console.error('Error saving Mirage 3500 order:', error)
        req.flash('error', 'Failed to save Mirage 3500 order. Please try again.')
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



module.exports = ordersController