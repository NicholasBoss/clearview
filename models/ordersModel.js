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
        // Select existing mirage record by build_out
        const mirageSql = 'SELECT mirage_id FROM mirage WHERE mirage_build_out = $1'
        const mirageResult = await pool.query(mirageSql, [mirage_build_out])

        if (mirageResult.rows.length === 0) {
            throw new Error('Mirage build out configuration not found')
        }

        const mirageId = mirageResult.rows[0].mirage_id

        const productSql = 'SELECT product_id FROM product WHERE product_name = $1'
        const productResult = await pool.query(productSql, [product_name])
        const productId = productResult.rows[0].product_id

        const customizationSql = `INSERT INTO customization
            (product_id, mirage_id, is_estimate, is_confirmed)
            VALUES ($1, $2, true, false) RETURNING customization_id`
        const customizationResult = await pool.query(customizationSql, [productId, mirageId])

        return customizationResult.rows[0]
    } catch (error) {
        return error.message
    }
}

async function createRainierOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
    try {
        const productSql = 'SELECT product_id FROM product WHERE product_name = $1'
        const productResult = await pool.query(productSql, [product_name])
        const productId = productResult.rows[0].product_id

        const customizationSql = `INSERT INTO customization 
            (product_id, is_estimate, is_confirmed) 
            VALUES ($1, true, false) RETURNING customization_id`
        const customizationResult = await pool.query(customizationSql, [productId])
        
        return customizationResult.rows[0]
    } catch (error) {
        return error.message
    }
}

async function createNWSOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
    try {
        const productSql = 'SELECT product_id FROM product WHERE product_name = $1'
        const productResult = await pool.query(productSql, [product_name])
        const productId = productResult.rows[0].product_id

        const customizationSql = `INSERT INTO customization 
            (product_id, is_estimate, is_confirmed) 
            VALUES ($1, true, false) RETURNING customization_id`
        const customizationResult = await pool.query(customizationSql, [productId])
        
        return customizationResult.rows[0]
    } catch (error) {
        return error.message
    }
}

async function createDoorOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
    try {
        const productSql = 'SELECT product_id FROM product WHERE product_name = $1'
        const productResult = await pool.query(productSql, [product_name])
        const productId = productResult.rows[0].product_id

        const customizationSql = `INSERT INTO customization 
            (product_id, is_estimate, is_confirmed) 
            VALUES ($1, true, false) RETURNING customization_id`
        const customizationResult = await pool.query(customizationSql, [productId])
        
        return customizationResult.rows[0]
    } catch (error) {
        return error.message
    }
}

async function createHaleScreenModelOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
    try {
        const productSql = 'SELECT product_id FROM product WHERE product_name = $1'
        const productResult = await pool.query(productSql, [product_name])
        const productId = productResult.rows[0].product_id

        const customizationSql = `INSERT INTO customization 
            (product_id, is_estimate, is_confirmed) 
            VALUES ($1, true, false) RETURNING customization_id`
        const customizationResult = await pool.query(customizationSql, [productId])
        
        return customizationResult.rows[0]
    } catch (error) {
        return error.message
    }
}

async function createPhantomOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
    try {
        const productSql = 'SELECT product_id FROM product WHERE product_name = $1'
        const productResult = await pool.query(productSql, [product_name])
        const productId = productResult.rows[0].product_id

        const customizationSql = `INSERT INTO customization 
            (product_id, is_estimate, is_confirmed) 
            VALUES ($1, true, false) RETURNING customization_id`
        const customizationResult = await pool.query(customizationSql, [productId])
        
        return customizationResult.rows[0]
    } catch (error) {
        return error.message
    }
}

async function createWizardSmartScreenOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
    try {
        const productSql = 'SELECT product_id FROM product WHERE product_name = $1'
        const productResult = await pool.query(productSql, [product_name])
        const productId = productResult.rows[0].product_id

        const customizationSql = `INSERT INTO customization 
            (product_id, is_estimate, is_confirmed) 
            VALUES ($1, true, false) RETURNING customization_id`
        const customizationResult = await pool.query(customizationSql, [productId])
        
        return customizationResult.rows[0]
    } catch (error) {
        return error.message
    }
}

async function createViewguardOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
    try {
        const productSql = 'SELECT product_id FROM product WHERE product_name = $1'
        const productResult = await pool.query(productSql, [product_name])
        const productId = productResult.rows[0].product_id

        const customizationSql = `INSERT INTO customization 
            (product_id, is_estimate, is_confirmed) 
            VALUES ($1, true, false) RETURNING customization_id`
        const customizationResult = await pool.query(customizationSql, [productId])
        
        return customizationResult.rows[0]
    } catch (error) {
        return error.message
    }
}

async function createSunscreenOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
    try {
        const productSql = 'SELECT product_id FROM product WHERE product_name = $1'
        const productResult = await pool.query(productSql, [product_name])
        const productId = productResult.rows[0].product_id

        const customizationSql = `INSERT INTO customization 
            (product_id, is_estimate, is_confirmed) 
            VALUES ($1, true, false) RETURNING customization_id`
        const customizationResult = await pool.query(customizationSql, [productId])
        
        return customizationResult.rows[0]
    } catch (error) {
        return error.message
    }
}

async function createHaleDoorOrder (product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
    try {
        const productSql = 'SELECT product_id FROM product WHERE product_name = $1'
        const productResult = await pool.query(productSql, [product_name])
        const productId = productResult.rows[0].product_id

        const customizationSql = `INSERT INTO customization 
            (product_id, is_estimate, is_confirmed) 
            VALUES ($1, true, false) RETURNING customization_id`
        const customizationResult = await pool.query(customizationSql, [productId])
        
        return customizationResult.rows[0]
    } catch (error) {
        return error.message
    }
}

async function createGeneralRetractControlOrder(product_name, measurement_name, size_type, fastener_type, color_name, mesh_type){
    try {
        const productSql = 'SELECT product_id FROM product WHERE product_name = $1'
        const productResult = await pool.query(productSql, [product_name])
        const productId = productResult.rows[0].product_id

        const customizationSql = `INSERT INTO customization 
            (product_id, is_estimate, is_confirmed) 
            VALUES ($1, true, false) RETURNING customization_id`
        const customizationResult = await pool.query(customizationSql, [productId])
        
        return customizationResult.rows[0]
    } catch (error) {
        return error.message
    }
}

async function updateOrder(customization_id, is_confirmed){
    try {
        const sql = 'UPDATE customization SET is_confirmed = $1, is_estimate = $2 WHERE customization_id = $3 RETURNING *'
        const result = await pool.query(sql, [is_confirmed, !is_confirmed, customization_id])
        return result.rows[0]
    } catch (error) {
        return error.message
    }
}

async function deleteOrder(customization_id){
    try {
        const sql = 'DELETE FROM customization WHERE customization_id = $1 RETURNING *'
        const result = await pool.query(sql, [customization_id])
        return result.rows[0]
    } catch (error) {
        return error.message
    }
}

async function getOrdersByAccountId(account_id){
    try {
        const sql = `SELECT c.customization_id, c.product_id, p.product_name, c.is_estimate, c.is_confirmed,
                     m3.mirage_3500_handle, m.mirage_build_out
                     FROM customization c
                     JOIN product p ON c.product_id = p.product_id
                     LEFT JOIN mirage_3500 m3 ON c.mirage_3500_id = m3.mirage_3500_id
                     LEFT JOIN mirage m ON c.mirage_id = m.mirage_id
                     WHERE c.account_id = $1
                     ORDER BY c.customization_id DESC`
        const result = await pool.query(sql, [account_id])
        return result.rows
    } catch (error) {
        return error.message
    }
}

async function getOrderById(customization_id){
    try {
        const sql = `SELECT c.*, p.product_name, m3.mirage_3500_handle, m.mirage_build_out
                     FROM customization c
                     JOIN product p ON c.product_id = p.product_id
                     LEFT JOIN mirage_3500 m3 ON c.mirage_3500_id = m3.mirage_3500_id
                     LEFT JOIN mirage m ON c.mirage_id = m.mirage_id
                     WHERE c.customization_id = $1`
        const result = await pool.query(sql, [customization_id])
        return result.rows[0]
    } catch (error) {
        return error.message
    }
}

async function getMeasurements() {
    try {
        const sql = 'SELECT * FROM measurement ORDER BY measurement_id'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        return error.message
    }
}

async function getColors() {
    try {
        const sql = 'SELECT DISTINCT color_name FROM color ORDER BY color_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting colors:', error)
        return []
    }
}

async function getHandles() {
    try {
        const sql = 'SELECT DISTINCT mirage_3500_handle FROM mirage_3500 ORDER BY mirage_3500_handle'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting handles:', error)
        return []
    }
}

async function getTopAdapters() {
    try {
        const sql = 'SELECT DISTINCT top_adapter_name FROM top_adapter ORDER BY top_adapter_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting top adapters:', error)
        return []
    }
}

async function getBottomAdapters() {
    try {
        const sql = 'SELECT DISTINCT bottom_adapter_name FROM bottom_adapter ORDER BY bottom_adapter_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting bottom adapters:', error)
        return []
    }
}

async function getRightBuildouts() {
    try {
        const sql = 'SELECT DISTINCT right_buildout_name FROM right_buildout ORDER BY right_buildout_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting right buildouts:', error)
        return []
    }
}

async function getLeftBuildouts() {
    try {
        const sql = 'SELECT DISTINCT left_buildout_name FROM left_buildout ORDER BY left_buildout_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting left buildouts:', error)
        return []
    }
}

async function getMeshTypes() {
    try {
        const sql = 'SELECT DISTINCT mesh_type FROM mesh ORDER BY mesh_type'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting mesh types:', error)
        return []
    }
}

// Helper function to get or insert a value in a simple table
async function getOrInsert(tableName, columnName, value, idColumnName) {
    try {
        if (!value) return null

        // Try to SELECT first
        const selectSql = `SELECT ${idColumnName} FROM ${tableName} WHERE ${columnName} = $1`
        const selectResult = await pool.query(selectSql, [value])

        if (selectResult.rows.length > 0) {
            // Record exists, return its ID
            return selectResult.rows[0][idColumnName]
        } else {
            // Record doesn't exist, INSERT it
            const insertSql = `INSERT INTO ${tableName} (${columnName}) VALUES ($1) RETURNING ${idColumnName}`
            const insertResult = await pool.query(insertSql, [value])
            return insertResult.rows[0][idColumnName]
        }
    } catch (error) {
        console.error(`Error in getOrInsert for ${tableName}:`, error)
        throw error
    }
}

// Helper function to combine integer measurement with fraction
function combineMeasurement(integerPart, fractionPart) {
    if (!integerPart && !fractionPart) return null
    if (!integerPart) return fractionPart
    if (!fractionPart) return integerPart
    return `${integerPart} ${fractionPart}`
}

// Helper function to get measurement_id for a fraction value
async function getMeasurementId(fractionValue) {
    try {
        if (!fractionValue) return null

        const sql = 'SELECT measurement_id FROM measurement WHERE measurement_name = $1'
        const result = await pool.query(sql, [fractionValue])

        if (result.rows.length > 0) {
            return result.rows[0].measurement_id
        }
        return null
    } catch (error) {
        console.error('Error getting measurement_id:', error)
        return null
    }
}

// Handle measurement dimensions with junction tables
async function handleMeasurementWithJunction(dimensionTable, dimensionColumn, dimensionIdColumn,
                                              junctionTable, measurementIntPart, measurementFraction) {
    try {
        // Combine the measurement
        const fullMeasurement = combineMeasurement(measurementIntPart, measurementFraction)
        if (!fullMeasurement) return null

        // INSERT/SELECT the dimension value
        const dimensionId = await getOrInsert(dimensionTable, dimensionColumn, fullMeasurement, dimensionIdColumn)

        // Get the measurement_id for the fraction (if provided)
        const measurementId = await getMeasurementId(measurementFraction)

        // If we have both IDs, create junction table entry
        if (dimensionId && measurementId) {
            // Check if junction entry exists
            const checkSql = `SELECT * FROM ${junctionTable} WHERE ${dimensionIdColumn} = $1 AND measurement_id = $2`
            const checkResult = await pool.query(checkSql, [dimensionId, measurementId])

            if (checkResult.rows.length === 0) {
                // Insert junction entry
                const insertSql = `INSERT INTO ${junctionTable} (measurement_id, ${dimensionIdColumn}) VALUES ($1, $2)`
                await pool.query(insertSql, [measurementId, dimensionId])
            }
        }

        return dimensionId
    } catch (error) {
        console.error(`Error in handleMeasurementWithJunction for ${dimensionTable}:`, error)
        throw error
    }
}

// Comprehensive function to save all Mirage 3500 data
async function saveMirage3500Data(formData) {
    try {
        // 1. Handle mirage_3500 (handle type)
        const mirage3500Id = await getOrInsert('mirage_3500', 'mirage_3500_handle', formData.handle, 'mirage_3500_id')

        // 2. Handle main color
        const colorId = await getOrInsert('color', 'color_name', formData.color_name, 'color_id')

        // 3. Handle handle color
        const handleColorId = await getOrInsert('color', 'color_name', formData.handle_color, 'color_id')

        // 4. Handle top adapter color
        const topAdapterColorId = await getOrInsert('color', 'color_name', formData.top_adapter_color, 'color_id')

        // 5. Handle bottom adapter color
        const btmAdapterColorId = await getOrInsert('color', 'color_name', formData.btm_adapter_color, 'color_id')

        // 6. Handle top adapter
        const topAdapterId = await getOrInsert('top_adapter', 'top_adapter_name', formData.top_adapter, 'top_adapter_id')

        // 7. Handle bottom adapter
        const btmAdapterId = await getOrInsert('bottom_adapter', 'bottom_adapter_name', formData.btm_adapter, 'bottom_adapter_id')

        // 8. Handle right buildout
        const rightBuildoutId = await getOrInsert('right_buildout', 'right_buildout_name', formData.right_build_out, 'right_buildout_id')

        // 9. Handle left buildout
        const leftBuildoutId = await getOrInsert('left_buildout', 'left_buildout_name', formData.left_build_out, 'left_buildout_id')

        // 10. Handle starting point
        const startingPointId = await getOrInsert('starting_point', 'starting_point_name', formData.starting_point, 'starting_point_id')

        // 11. Handle top level
        const topLevelId = await getOrInsert('top_level', 'top_level_name', formData.top_level, 'top_level_id')

        // 12. Handle bottom level
        const bottomLevelId = await getOrInsert('bottom_level', 'bottom_level_name', formData.bottom_level, 'bottom_level_id')

        // 13. Handle left plumb
        const leftPlumbId = await getOrInsert('left_plumb', 'left_plumb_name', formData.left_plumb, 'left_plumb_id')

        // 14. Handle right plumb
        const rightPlumbId = await getOrInsert('right_plumb', 'right_plumb_name', formData.right_plumb, 'right_plumb_id')

        // 15. Handle mesh
        const meshId = await getOrInsert('mesh', 'mesh_type', formData.mesh, 'mesh_id')

        // 16. Get product_id for Mirage 3500
        const productSql = 'SELECT product_id FROM product WHERE product_name = $1'
        const productResult = await pool.query(productSql, ['Mirage 3500'])
        const productId = productResult.rows[0].product_id

        // 17. Handle all measurements with their fractions
        console.log('Processing measurements...')

        // Top Opening Width
        const topOpeningWidthId = await handleMeasurementWithJunction(
            'top_opening_width',
            'top_opening_width_name',
            'top_opening_width_id',
            'tow_measurement',
            formData.top_opening_width,
            formData.top_opening_width_fraction
        )

        // Bottom Opening Width
        const bottomOpeningWidthId = await handleMeasurementWithJunction(
            'bottom_opening_width',
            'bottom_opening_width_name',
            'bottom_opening_width_id',
            'bow_measurement',
            formData.bottom_opening_width,
            formData.bottom_opening_width_fraction
        )

        // Left Opening Height
        const leftOpeningHeightId = await handleMeasurementWithJunction(
            'left_opening_height',
            'left_opening_height_name',
            'left_opening_height_id',
            'loh_measurement',
            formData.left_opening_height,
            formData.left_opening_height_fraction
        )

        // Right Opening Height
        const rightOpeningHeightId = await handleMeasurementWithJunction(
            'right_opening_height',
            'right_opening_height_name',
            'right_opening_height_id',
            'roh_measurement',
            formData.right_opening_height,
            formData.right_opening_height_fraction
        )

        // Middle Opening Width (store as combined string if no dedicated table)
        const middleOpeningWidth = combineMeasurement(
            formData.middle_opening_width,
            formData.middle_opening_width_fraction
        )

        // Middle Opening Height (store as combined string if no dedicated table)
        const middleOpeningHeight = combineMeasurement(
            formData.middle_opening_height,
            formData.middle_opening_height_fraction
        )

        // Top Adapter Width (store as combined string)
        const topAdapterWidth = combineMeasurement(
            formData.top_adapter_width,
            formData.top_adapter_width_fraction
        )

        // Unit Height (store as combined string)
        const unitHeight = combineMeasurement(
            formData.unit_height,
            formData.unit_height_fraction
        )

        // Pivot Pro Height (store as combined string)
        const pivotProHeight = combineMeasurement(
            formData.pivot_pro_height,
            formData.pivot_pro_height_fraction
        )

        // Bottom Adapter Width (store as combined string)
        const btmAdapterWidth = combineMeasurement(
            formData.btm_adapter_width,
            formData.btm_adapter_width_fraction
        )

        // Build Out Dimension (store as combined string)
        const buildOutDimension = combineMeasurement(
            formData.build_out_dimension,
            formData.build_out_dimension_fraction
        )

        console.log('All measurements processed successfully')

        // TODO: The customization table currently only has basic columns
        // Coordinate with database person about adding columns for:
        // - dimension IDs (top_opening_width_id, bottom_opening_width_id, etc.)
        // - adapter IDs (top_adapter_id, bottom_adapter_id)
        // - buildout IDs (left_buildout_id, right_buildout_id)
        // - level/plumb IDs, pricing fields, mohair settings, etc.

        // For now, we'll need to determine what measurement_id to use
        // Using the top_opening_width fraction as the primary measurement for now
        const primaryMeasurementId = await getMeasurementId(formData.top_opening_width_fraction) || 1

        // Get product_mesh_id
        const productMeshSql = 'SELECT product_mesh_id FROM product_mesh WHERE product_id = $1 AND mesh_id = $2'
        const productMeshResult = await pool.query(productMeshSql, [productId, meshId])

        let productMeshId
        if (productMeshResult.rows.length > 0) {
            productMeshId = productMeshResult.rows[0].product_mesh_id
        } else {
            // Create product_mesh entry if it doesn't exist
            const insertProductMeshSql = 'INSERT INTO product_mesh (product_id, mesh_id) VALUES ($1, $2) RETURNING product_mesh_id'
            const insertResult = await pool.query(insertProductMeshSql, [productId, meshId])
            productMeshId = insertResult.rows[0].product_mesh_id
        }

        // Get or create a default fastener (since form doesn't currently collect this)
        const defaultFastenerSql = 'SELECT fastener_id FROM fastener LIMIT 1'
        const fastenerResult = await pool.query(defaultFastenerSql)
        const fastenerId = fastenerResult.rows[0]?.fastener_id || 1

        // Get or create a default frame_size (since form doesn't currently collect this)
        const defaultFrameSizeSql = 'SELECT frame_size_id FROM frame_size LIMIT 1'
        const frameSizeResult = await pool.query(defaultFrameSizeSql)
        const frameSizeId = frameSizeResult.rows[0]?.frame_size_id || 1

        // 18. INSERT into customization table with is_estimate=true
        // Using only the columns that currently exist in the schema
        const customizationSql = `
            INSERT INTO customization (
                product_id,
                measurement_id,
                frame_size_id,
                fastener_id,
                color_id,
                mesh_id,
                product_mesh_id,
                mirage_3500_id,
                is_estimate,
                is_confirmed
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, true, false
            ) RETURNING customization_id
        `

        const customizationResult = await pool.query(customizationSql, [
            productId,           // $1
            primaryMeasurementId,// $2
            frameSizeId,         // $3
            fastenerId,          // $4
            colorId,             // $5
            meshId,              // $6
            productMeshId,       // $7
            mirage3500Id         // $8
        ])

        const customizationId = customizationResult.rows[0].customization_id

        console.log('Order saved with customization_id:', customizationId)

        // Return the customization_id
        return {
            customization_id: customizationId
        }
    } catch (error) {
        console.error('Error in saveMirage3500Data:', error)
        throw error
    }
}

// Function to confirm Mirage 3500 order (update is_confirmed flag)
async function confirmMirage3500Order(customizationId) {
    try {
        const sql = `
            UPDATE customization
            SET is_confirmed = true, is_estimate = false
            WHERE customization_id = $1
            RETURNING customization_id
        `
        const result = await pool.query(sql, [customizationId])

        if (result.rows.length === 0) {
            throw new Error('Order not found')
        }

        console.log('Order confirmed with customization_id:', customizationId)
        return result.rows[0]
    } catch (error) {
        console.error('Error in confirmMirage3500Order:', error)
        throw error
    }
}

module.exports = {
    createOrder,
    createMirage3500Order,
    createMirageOrder,
    createRainierOrder,
    createNWSOrder,
    createDoorOrder,
    createHaleScreenModelOrder,
    createPhantomOrder,
    createWizardSmartScreenOrder,
    createViewguardOrder,
    createSunscreenOrder,
    createHaleDoorOrder,
    createGeneralRetractControlOrder,
    updateOrder,
    deleteOrder,
    getOrdersByAccountId,
    getOrderById,
    getMeasurements,
    saveMirage3500Data,
    confirmMirage3500Order,
    getOrInsert,
    getColors,
    getHandles,
    getTopAdapters,
    getBottomAdapters,
    getRightBuildouts,
    getLeftBuildouts,
    getMeshTypes
}