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

    measurements = await ordersModel.getMeasurements()
    // console.log(measurements)

    res.render('orders/createMirage3500', {
        title: 'Create Mirage 3500 order',
        link: 'orders/createMirage3500',
        errors: null,
        fractions: measurements
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
ordersController.buildConfirmMirage = async function(req, res){
    res.render('orders/confirmMirage', {
        title: 'Confirm Mirage order',
        link: 'orders/confirmMirage',
        errors: null
    })
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

    res.render('orders/createRainier', {
        title: 'Create order',
        link: 'orders/createRainier',
        errors: null,
        placement: placement || [],
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



module.exports = ordersController