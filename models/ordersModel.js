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
        // else if (product_name == 'Door'){
        //     createDoorOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type)
        // }
        // else if (product_name == 'Hale Screen Model'){
        //     createHaleScreenModelOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type)
        // }
        // else if (product_name == 'Phantom'){
        //     createPhantomOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type)
        // }
        // else if (product_name == 'Wizard Smart Screen'){
        //     createWizardSmartScreenOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type)
        // }
        // else if (product_name == 'Viewguard'){
        //     createViewguardOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type)
        // }
        // else if (product_name == 'Sunscreen'){
        //     createSunscreenOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type)
        // }
        // else if (product_name == 'Hale Door'){
        //     createHaleDoorOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type)
        // }
        // else if (product_name == 'General Retract Control'){
        //     createGeneralRetractControlOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type)
        // }
    } catch (error) {
        return error.message
    }
}

async function getMeasurements() {
    try {
        const sql = 'SELECT measurement_name FROM measurement;'
        const measurement = await pool.query(sql)
        // console.log(measurement)
        // console.log(measurement.rows)
        return measurement.rows
    } catch (error) {
        return error.message
    }
}

async function getColors() {
    try {
        const sql = `
            SELECT DISTINCT c.color_id, c.color_name 
            FROM color c
            INNER JOIN product_color pc ON c.color_id = pc.color_id
            ORDER BY c.color_name;
        `
        const colors = await pool.query(sql)
        return colors.rows
    } catch (error) {
        return error.message
    }
}

async function getColorsByProduct(product_name) {
    try {
        const sql = `
            SELECT c.color_id, c.color_name 
            FROM color c
            INNER JOIN product_color pc ON c.color_id = pc.color_id
            INNER JOIN product p ON pc.product_id = p.product_id
            WHERE p.product_name = $1
            ORDER BY c.color_name;
        `
        const colors = await pool.query(sql, [product_name])
        return colors.rows
    } catch (error) {
        return error.message
    }
}

async function createMirage3500Order(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type, mirage_3500_handle) {
    try {
        // Select existing mirage_3500 record by handle
        const mirage3500Sql = 'SELECT mirage_3500_id FROM mirage_3500 WHERE mirage_3500_handle = ?'
        const mirage3500Result = await pool.query(mirage3500Sql, [mirage_3500_handle])

        if (mirage3500Result.length === 0) {
            throw new Error('Mirage 3500 handle configuration not found')
        }

        const mirage3500Id = mirage3500Result[0].mirage_3500_id

        // Get product_id
        const productSql = 'SELECT product_id FROM product WHERE product_name = ?'
        const productResult = await pool.query(productSql, [product_name])
        const productId = productResult[0].product_id

        // Get measurement_id
        const measurementSql = 'SELECT measurement_id FROM measurement WHERE measurement_name = ?'
        const measurementResult = await pool.query(measurementSql, [measurement_name])
        const measurementId = measurementResult[0].measurement_id

        // Get frame_size_id
        const frameSizeSql = 'SELECT frame_size_id FROM frame_size WHERE size_type = ?'
        const frameSizeResult = await pool.query(frameSizeSql, [size_type])
        const frameSizeId = frameSizeResult[0].frame_size_id

        // Get fastener_id
        const fastenerSql = 'SELECT fastener_id FROM fastener WHERE fastener_type = ?'
        const fastenerResult = await pool.query(fastenerSql, [fastener_type])
        const fastenerId = fastenerResult[0].fastener_id

        // Get color_id
        const colorSql = 'SELECT color_id FROM color WHERE color_name = ?'
        const colorResult = await pool.query(colorSql, [color_name])
        const colorId = colorResult[0].color_id

        // Get mesh_id
        const meshSql = 'SELECT mesh_id FROM mesh WHERE mesh_type = ?'
        const meshResult = await pool.query(meshSql, [mesh_type])
        const meshId = meshResult[0].mesh_id

        // Get product_mesh_id
        const productMeshSql = 'SELECT product_mesh_id FROM product_mesh WHERE product_id = ? AND mesh_id = ?'
        const productMeshResult = await pool.query(productMeshSql, [productId, meshId])
        const productMeshId = productMeshResult[0].product_mesh_id

        const customizationSql = `INSERT INTO customization
            (product_id, measurement_id, frame_size_id, fastener_id, color_id, mesh_id, product_mesh_id, mirage_3500_id, is_estimate, is_confirmed)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        const customizationResult = await pool.query(customizationSql, [productId, measurementId, frameSizeId, fastenerId, colorId, meshId, productMeshId, mirage3500Id, 1, 0])

        return { customization_id: customizationResult.insertId }
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

// async function createDoorOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
//     try {

//     } catch (error) {
//         return error.message
//     }
// }

// async function createHaleScreenModelOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
//     try {

//     } catch (error) {
//         return error.message
//     }
// }

// async function createPhantomOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
//     try {

//     } catch (error) {
//         return error.message
//     }
// }

// async function createWizardSmartScreenOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
//     try {

//     } catch (error) {
//         return error.message
//     }
// }

// async function createViewguardOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
//     try {

//     } catch (error) {
//         return error.message
//     }
// }

// async function createSunscreenOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
//     try {

//     } catch (error) {
//         return error.message
//     }
// }

// async function createHaleDoorOrder (product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
//     try {

//     } catch (error) {
//         return error.message
//     }
// }

// async function updateOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type, mirage_build_out, mirage_3500_handle){
//     try {

//     } catch (error) {
//         return error.message
//     }
// }

// async function deleteOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type, mirage_build_out, mirage_3500_handle){
//     try {

//     } catch (error) {
//         return error.message
//     }
// }

module.exports = {
    createOrder,
    getMeasurements,
    getColors,
    getColorsByProduct
}