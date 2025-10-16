const pool = require('../database/')

async function createOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type, mirage_build_out, mirage_3500_handle) {
    try {
        if (product_name == 'Mirage 3500'){
            createMirage3500Order(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type, mirage_3500_handle)
        }
        else if (product_name == 'Mirage'){
            createMirageOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type, mirage_build_out)
        }
        else if (product_name == 'Rainier'){
            createRainierOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type)
        }
        else if (product_name == 'NWS'){
            createNWSOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type)
        }
        else if (product_name == 'Door'){
            createDoorOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type)
        }
        else if (product_name == 'Hale Screen Model'){
            createHaleScreenModelOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type)
        }
        else if (product_name == 'Phantom'){
            createPhantomOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type)
        }
        else if (product_name == 'Wizard Smart Screen'){
            createWizardSmartScreenOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type)
        }
        else if (product_name == 'Viewguard'){
            createViewguardOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type)
        }
        else if (product_name == 'Sunscreen'){
            createSunscreenOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type)
        }
        else if (product_name == 'Hale Door'){
            createHaleDoorOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type)
        }
        else if (product_name == 'General Retract Control'){
            createGeneralRetractControlOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type)
        }
    } catch (error) {
        return error.message
    }
}

async function createMirage3500Order(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type, mirage_3500_handle) {
    try {
        const mirage3500Sql = 'INSERT INTO mirage_3500 (mirage_3500_handle) VALUES ($1) RETURNING mirage_3500_id'
        const mirage3500Result = await pool.query(mirage3500Sql, [mirage_3500_handle])
        const mirage3500Id = mirage3500Result.rows[0].mirage_3500_id

        const productSql = 'SELECT product_id FROM product WHERE product_name = $1'
        const productResult = await pool.query(productSql, [product_name])
        const productId = productResult.rows[0].product_id

        const customizationSql = `INSERT INTO customization 
            (product_id, mirage_3500_id, is_estimate, is_confirmed) 
            VALUES ($1, $2, true, false) RETURNING customization_id`
        const customizationResult = await pool.query(customizationSql, [productId, mirage3500Id])
        
        return customizationResult.rows[0]
    } catch (error) {
        return error.message
    }
}

async function createMirageOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type, mirage_build_out) {
    try {

    } catch (error) {
        return error.message
    }
}

async function createRainierOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
    try {

    } catch (error) {
        return error.message
    }
}

async function createNWSOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
    try {

    } catch (error) {
        return error.message
    }
}

async function createDoorOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
    try {

    } catch (error) {
        return error.message
    }
}

async function createHaleScreenModelOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
    try {

    } catch (error) {
        return error.message
    }
}

async function createPhantomOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
    try {

    } catch (error) {
        return error.message
    }
}

async function createWizardSmartScreenOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
    try {

    } catch (error) {
        return error.message
    }
}

async function createViewguardOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
    try {

    } catch (error) {
        return error.message
    }
}

async function createSunscreenOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
    try {

    } catch (error) {
        return error.message
    }
}

async function createHaleDoorOrder (product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
    try {

    } catch (error) {
        return error.message
    }
}

async function updateOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type, mirage_build_out, mirage_3500_handle){
    try {

    } catch (error) {
        return error.message
    }
}

async function deleteOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type, mirage_build_out, mirage_3500_handle){
    try {

    } catch (error) {
        return error.message
    }
}