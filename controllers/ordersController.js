const ordersController = {}

ordersController.buildCreate = async function(req, res){
    res.render('orders/create', {
        title: 'Create order',
        link: 'orders/create',
        errors: null
    })
}

ordersController.buildRead = async function(req, res){
    res.render('orders/read', {
        title: 'Read order',
        link: 'orders/read',
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

ordersController.updateOrder = async function(req, res){
    const { product_name, measurement_name, size_type, fastener_type, color_name, mesh_type, mirage_build_out, mirage_3500_handle } = req.body
    console.log('Updating order')
    try {
        const order = await ordersModel.updateOrder(
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
        console.log('Error updating order:', error);
    }
}

ordersController.deleteOrder = async function(req, res){
    const { product_name, measurement_name, size_type, fastener_type, color_name, mesh_type, mirage_build_out, mirage_3500_handle } = req.body
    = req.body
    console.log('Deleting order')
    try {
        const order = await ordersModel.deleteOrder(
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
        console.log('Error deleting order:', error);
    }
}



// individual order creation functions
ordersController.buildCreateMirage3500 = async function(req, res){
    res.render('orders/createMirage3500', {
        title: 'Create Mirage 3500 order',
        link: 'orders/createMirage3500',
        errors: null
    })
}
ordersController.buildConfirmMirage3500 = async function(req, res){
    res.render('orders/confirmMirage3500', {
        title: 'Confirm Mirage 3500 order',
        link: 'orders/confirmMirage3500',
        errors: null
    })
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