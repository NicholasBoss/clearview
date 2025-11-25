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
        // NOTE: All users are admins/employees who create orders for customers
        // This function returns ALL orders for display on the account page
        // Orders are not filtered by logged-in user since all users need to see all orders

        const sql = `
            SELECT
                c.customization_id,
                c.product_id,
                p.product_name,
                oc.is_estimate,
                oc.is_confirmed,
                oc.is_completed,
                oc.is_cancelled,
                oc.order_id,
                o.order_date,
                m3.mirage_3500_handle,
                m.mirage_build_out,
                cust.customer_id,
                cust.customer_firstname,
                cust.customer_lastname
            FROM customization c
            JOIN product p ON c.product_id = p.product_id
            LEFT JOIN order_customization oc ON c.customization_id = oc.customization_id
            LEFT JOIN public.order o ON oc.order_id = o.order_id
            LEFT JOIN cust_order co ON o.order_id = co.order_id
            LEFT JOIN customer cust ON co.customer_id = cust.customer_id
            LEFT JOIN mirage_3500 m3 ON c.mirage_3500_id = m3.mirage_3500_id
            LEFT JOIN mirage m ON c.mirage_id = m.mirage_id
            ORDER BY c.customization_id DESC
        `
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error in getOrdersByAccountId:', error)
        return []
    }
}

async function getOrderById(customization_id){
    try {
        const sql = `
            SELECT
                c.*,
                p.product_name,
                col.color_name,
                mesh.mesh_type,
                m3.mirage_3500_handle,
                m.mirage_build_out,
                grc.door_type,
                grc.door_mount,
                grc.opening_side,
                grc.btm_adapter_color,
                grc_mohair.mohair_type,
                grc_mohair_pos.mohair_position_name,
                grc_top_adapter.top_adapter_name AS top_adapter_type,
                grc_bottom_adapter.bottom_adapter_name AS bottom_adapter_type,
                grc_buildout.buildout_name,
                tow_dim.top_opening_width_name,
                bow_dim.bottom_opening_width_name,
                loh_dim.left_opening_height_name,
                roh_dim.right_opening_height_name
            FROM customization c
            JOIN product p ON c.product_id = p.product_id
            LEFT JOIN color col ON c.color_id = col.color_id
            LEFT JOIN mesh ON c.mesh_id = mesh.mesh_id
            LEFT JOIN mirage_3500 m3 ON c.mirage_3500_id = m3.mirage_3500_id
            LEFT JOIN mirage m ON c.mirage_id = m.mirage_id
            LEFT JOIN general_retract_control grc ON c.general_retract_control_id = grc.general_retract_control_id
            LEFT JOIN mohair grc_mohair ON grc.mohair_id = grc_mohair.mohair_id
            LEFT JOIN mohair_position grc_mohair_pos ON grc.mohair_position_id = grc_mohair_pos.mohair_position_id
            LEFT JOIN top_adapter grc_top_adapter ON grc.top_adapter_id = grc_top_adapter.top_adapter_id
            LEFT JOIN bottom_adapter grc_bottom_adapter ON grc.bottom_adapter_id = grc_bottom_adapter.bottom_adapter_id
            LEFT JOIN buildout grc_buildout ON grc.buildout_id = grc_buildout.buildout_id
            LEFT JOIN tow_measurement tow ON c.measurement_id = tow.measurement_id
            LEFT JOIN top_opening_width tow_dim ON tow.top_opening_width_id = tow_dim.top_opening_width_id
            LEFT JOIN bow_measurement bow ON c.measurement_id = bow.measurement_id
            LEFT JOIN bottom_opening_width bow_dim ON bow.bottom_opening_width_id = bow_dim.bottom_opening_width_id
            LEFT JOIN loh_measurement loh ON c.measurement_id = loh.measurement_id
            LEFT JOIN left_opening_height loh_dim ON loh.left_opening_height_id = loh_dim.left_opening_height_id
            LEFT JOIN roh_measurement roh ON c.measurement_id = roh.measurement_id
            LEFT JOIN right_opening_height roh_dim ON roh.right_opening_height_id = roh_dim.right_opening_height_id
            WHERE c.customization_id = $1
        `
        const result = await pool.query(sql, [customization_id])
        const row = result.rows[0]

        if (!row) return null

        // Helper function to split combined measurements (e.g., "36 1/4" -> {int: "36", fraction: "1/4"})
        const splitMeasurement = (combined) => {
            if (!combined) return { int: '', fraction: '' }
            const parts = combined.trim().split(' ')
            return {
                int: parts[0] || '',
                fraction: parts[1] || ''
            }
        }

        // Split measurements back into integer and fraction parts
        const topWidth = splitMeasurement(row.top_opening_width_name)
        const bottomWidth = splitMeasurement(row.bottom_opening_width_name)
        const leftHeight = splitMeasurement(row.left_opening_height_name)
        const rightHeight = splitMeasurement(row.right_opening_height_name)

        // Return data in the format expected by the view (matching form field names)
        return {
            ...row,
            color_name: row.color_name,
            handle: row.mirage_3500_handle,
            mesh: row.mesh_type,
            top_adapter: row.top_adapter_type,
            btm_adapter: row.bottom_adapter_type,
            btm_adapter_color: row.btm_adapter_color,
            buildout: row.buildout_name,
            mohair: row.mohair_type,
            mohair_position: row.mohair_position_name,
            door_type: row.door_type,
            door_mount: row.door_mount,
            opening_side: row.opening_side,
            // Split measurements into integer and fraction parts
            top_opening_width: topWidth.int,
            top_opening_width_fraction: topWidth.fraction,
            bottom_opening_width: bottomWidth.int,
            bottom_opening_width_fraction: bottomWidth.fraction,
            left_opening_height: leftHeight.int,
            left_opening_height_fraction: leftHeight.fraction,
            right_opening_height: rightHeight.int,
            right_opening_height_fraction: rightHeight.fraction
        }
    } catch (error) {
        console.error('Error in getOrderById:', error)
        return null
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
        const sql = 'SELECT right_buildout_id, right_buildout_name FROM right_buildout ORDER BY right_buildout_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting right buildouts:', error)
        return []
    }
}

async function getLeftBuildouts() {
    try {
        const sql = 'SELECT left_buildout_id, left_buildout_name FROM left_buildout ORDER BY left_buildout_name'
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

async function getRainierPlacements() {
    try {
        const sql = 'SELECT placement_id, placement_name FROM placement ORDER BY placement_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting rainier placements:', error)
        return []
    }
}

async function getRainierColors() {
    try {
        const sql = `
            SELECT DISTINCT c.color_id, c.color_name 
            FROM color c
            INNER JOIN product_color pc ON c.color_id = pc.color_id
            INNER JOIN product p ON pc.product_id = p.product_id
            WHERE p.product_name = 'Rainier'
            ORDER BY c.color_name
        `
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting rainier colors:', error)
        return []
    }
}

async function getHardwareColors() {
    try {
        const sql = `
            SELECT DISTINCT hc.hardware_color_id, c.color_id, c.color_name
            FROM hardware_color hc
            INNER JOIN product_color pc ON hc.product_color_id = pc.product_color_id
            INNER JOIN color c ON pc.color_id = c.color_id
            ORDER BY c.color_name
        `
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting hardware colors:', error)
        return []
    }
}

async function getRainierFabricColors() {
    try {
        const sql = 'SELECT fabric_id, fabric_name FROM fabric ORDER BY fabric_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting rainier fabric colors:', error)
        return []
    }
}

async function getHousingSeries() {
    try {
        const sql = 'SELECT housing_id, housing_series_name FROM housing ORDER BY housing_series_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting housing series:', error)
        return []
    }
}

async function getDriveSides() {
    try {
        const sql = 'SELECT drive_side_id, drive_side_name FROM drive_side ORDER BY drive_side_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting drive sides:', error)
        return []
    }
}

async function getHembars() {
    try {
        const sql = 'SELECT hembar_id, hembar_name FROM hembar ORDER BY hembar_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting hembars:', error)
        return []
    }
}

async function getPileBrushes() {
    try {
        const sql = 'SELECT pilebrush_id, pilebrush_name FROM pilebrush ORDER BY pilebrush_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting pile brushes:', error)
        return []
    }
}

async function getBrushLocations() {
    try {
        const sql = 'SELECT brush_location_id, brush_location_name FROM brush_location ORDER BY brush_location_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting brush locations:', error)
        return []
    }
}

async function getZipperColors() {
    try {
        const sql = `
            SELECT DISTINCT c.color_id, c.color_name 
            FROM color c
            INNER JOIN rainier_zipper_color rzc ON c.color_id = rzc.product_color_id
            ORDER BY c.color_name
        `
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting zipper colors:', error)
        return []
    }
}

async function getCordLengths() {
    try {
        const sql = 'SELECT cord_length_id, cord_length_name FROM cord_length ORDER BY cord_length_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting cord lengths:', error)
        return []
    }
}

async function getMountTypes() {
    try {
        const sql = 'SELECT DISTINCT mount_type_name FROM mount_type ORDER BY mount_type_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting mount types:', error)
        return []
    }
}

async function getTracks() {
    try {
        const sql = 'SELECT right_track_id, right_track_name FROM right_track ORDER BY right_track_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting tracks:', error)
        return []
    }
}

async function getLeftTracks() {
    try {
        const sql = 'SELECT left_track_id, left_track_name FROM left_track ORDER BY left_track_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting left tracks:', error)
        return []
    }
}

async function getTopOpeningWidths() {
    try {
        const sql = 'SELECT top_opening_width_id, top_opening_width_name FROM top_opening_width ORDER BY top_opening_width_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting top opening widths:', error)
        return []
    }
}

async function getTopLevels() {
    try {
        const sql = 'SELECT top_level_id, top_level_name FROM top_level ORDER BY top_level_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting top levels:', error)
        return []
    }
}

async function getBottomOpeningWidths() {
    try {
        const sql = 'SELECT bottom_opening_width_id, bottom_opening_width_name FROM bottom_opening_width ORDER BY bottom_opening_width_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting bottom opening widths:', error)
        return []
    }
}

async function getBottomLevels() {
    try {
        const sql = 'SELECT bottom_level_id, bottom_level_name FROM bottom_level ORDER BY bottom_level_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting bottom levels:', error)
        return []
    }
}

async function getLeftOpeningHeights() {
    try {
        const sql = 'SELECT left_opening_height_id, left_opening_height_name FROM left_opening_height ORDER BY left_opening_height_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting left opening heights:', error)
        return []
    }
}

async function getRightOpeningHeights() {
    try {
        const sql = 'SELECT right_opening_height_id, right_opening_height_name FROM right_opening_height ORDER BY right_opening_height_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting right opening heights:', error)
        return []
    }
}

async function getLeftPlumbs() {
    try {
        const sql = 'SELECT left_plumb_id, left_plumb_name FROM left-plumb ORDER BY left_plumb_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting left plumbs:', error)
        return []
    }
}

async function getStartingPoints() {
    try {
        const sql = 'SELECT starting_point_id, starting_point_name FROM starting_point ORDER BY starting_point_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting starting points:', error)
        return []
    }
}

async function getAddBuildouts() {
    try {
        const sql = 'SELECT buildout_id, buildout_name FROM buildout ORDER BY buildout_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting add buildouts:', error)
        return []
    }
}

async function getRightPlumbs() {
    try {
        const sql = 'SELECT right_plumb_id, right_plumb_name FROM right-plumb ORDER BY right_plumb_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting right plumbs:', error)
        return []
    }
}

async function getPivotProColors() {
    try {
        const sql = `
            SELECT DISTINCT c.color_id, c.color_name
            FROM pivot_pro_color ppc
            JOIN product_color pc ON ppc.product_color_id = pc.product_color_id
            JOIN color c ON pc.color_id = c.color_id
            ORDER BY c.color_name
        `
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting pivot pro colors:', error)
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

// Helper function to get or create product_color entry
async function getOrCreateProductColor(productId, colorId) {
    try {
        if (!colorId) return null

        // Check if product_color entry exists
        const selectSql = 'SELECT product_color_id FROM product_color WHERE product_id = $1 AND color_id = $2'
        const selectResult = await pool.query(selectSql, [productId, colorId])

        if (selectResult.rows.length > 0) {
            return selectResult.rows[0].product_color_id
        }

        // Create product_color entry
        const insertSql = 'INSERT INTO product_color (product_id, color_id) VALUES ($1, $2) RETURNING product_color_id'
        const insertResult = await pool.query(insertSql, [productId, colorId])
        return insertResult.rows[0].product_color_id
    } catch (error) {
        console.error('Error in getOrCreateProductColor:', error)
        throw error
    }
}

// Helper function to get or create handle_color junction entry
async function getOrCreateHandleColor(productColorId, mirage3500Id) {
    try {
        if (!productColorId || !mirage3500Id) return null

        // Check if handle_color entry exists
        const selectSql = 'SELECT handle_color_id FROM handle_color WHERE product_color_id = $1 AND mirage_3500_id = $2'
        const selectResult = await pool.query(selectSql, [productColorId, mirage3500Id])

        if (selectResult.rows.length > 0) {
            return selectResult.rows[0].handle_color_id
        }

        // Create handle_color entry
        const insertSql = 'INSERT INTO handle_color (product_color_id, mirage_3500_id) VALUES ($1, $2) RETURNING handle_color_id'
        const insertResult = await pool.query(insertSql, [productColorId, mirage3500Id])
        return insertResult.rows[0].handle_color_id
    } catch (error) {
        console.error('Error in getOrCreateHandleColor:', error)
        throw error
    }
}

// Helper function to get or create top_adapter_color junction entry
async function getOrCreateTopAdapterColor(productColorId) {
    try {
        if (!productColorId) return null

        // Check if top_adapter_color entry exists
        const selectSql = 'SELECT top_adapter_color_id FROM top_adapter_color WHERE product_color_id = $1'
        const selectResult = await pool.query(selectSql, [productColorId])

        if (selectResult.rows.length > 0) {
            return selectResult.rows[0].top_adapter_color_id
        }

        // Create top_adapter_color entry
        const insertSql = 'INSERT INTO top_adapter_color (product_color_id) VALUES ($1) RETURNING top_adapter_color_id'
        const insertResult = await pool.query(insertSql, [productColorId])
        return insertResult.rows[0].top_adapter_color_id
    } catch (error) {
        console.error('Error in getOrCreateTopAdapterColor:', error)
        throw error
    }
}

// Helper function to get or create bottom_adapter_color junction entry
async function getOrCreateBottomAdapterColor(productColorId) {
    try {
        if (!productColorId) return null

        // Check if bottom_adapter_color entry exists
        const selectSql = 'SELECT bottom_adapter_color_id FROM bottom_adapter_color WHERE product_color_id = $1'
        const selectResult = await pool.query(selectSql, [productColorId])

        if (selectResult.rows.length > 0) {
            return selectResult.rows[0].bottom_adapter_color_id
        }

        // Create bottom_adapter_color entry
        const insertSql = 'INSERT INTO bottom_adapter_color (product_color_id) VALUES ($1) RETURNING bottom_adapter_color_id'
        const insertResult = await pool.query(insertSql, [productColorId])
        return insertResult.rows[0].bottom_adapter_color_id
    } catch (error) {
        console.error('Error in getOrCreateBottomAdapterColor:', error)
        throw error
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
        const rightPlumbId = await getOrInsert('right_plumb', 'right-plumb_name', formData.right_plumb, 'right_plumb_id')

        // 15. Handle mesh
        const meshId = await getOrInsert('mesh', 'mesh_type', formData.mesh, 'mesh_id')

        // 16. Handle mohair
        const mohairId = await getOrInsert('mohair', 'mohair_type', formData.mohair, 'mohair_id')

        // 17. Handle mohair position
        const mohairPositionId = await getOrInsert('mohair_position', 'mohair_position_name', formData.mohair_position, 'mohair_position_id')

        // 18. Get product_id for Mirage 3500
        const productSql = 'SELECT product_id FROM product WHERE product_name = $1'
        const productResult = await pool.query(productSql, ['Mirage 3500'])
        const productId = productResult.rows[0].product_id

        // 19. Create product_color and junction table entries for colors
        // Handle color - create product_color entry, then handle_color junction entry
        let handleColorJunctionId = null
        if (handleColorId) {
            const handleProductColorId = await getOrCreateProductColor(productId, handleColorId)
            handleColorJunctionId = await getOrCreateHandleColor(handleProductColorId, mirage3500Id)
        }

        // Top adapter color - create product_color entry, then top_adapter_color junction entry
        let topAdapterColorJunctionId = null
        if (topAdapterColorId) {
            const topAdapterProductColorId = await getOrCreateProductColor(productId, topAdapterColorId)
            topAdapterColorJunctionId = await getOrCreateTopAdapterColor(topAdapterProductColorId)
        }

        // Bottom adapter color - create product_color entry, then bottom_adapter_color junction entry
        let btmAdapterColorJunctionId = null
        if (btmAdapterColorId) {
            const btmAdapterProductColorId = await getOrCreateProductColor(productId, btmAdapterColorId)
            btmAdapterColorJunctionId = await getOrCreateBottomAdapterColor(btmAdapterProductColorId)
        }

        // 20. Handle all measurements with their fractions
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

        // Get primary measurement_id for the form
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

        // 19. INSERT into general_retract_control table first
        // Get buildout_id by inserting into buildout table
        const buildoutId = buildOutDimension ? await getOrInsert('buildout', 'buildout_name', buildOutDimension, 'buildout_id') : null

        // For mohair fields - if they're not provided, get a default "none" or first available ID
        // since general_retract_control requires these to be NOT NULL
        let finalMohairId = mohairId
        let finalMohairPositionId = mohairPositionId

        if (!finalMohairId) {
            // Get first mohair_id as default if none provided
            const defaultMohairSql = 'SELECT mohair_id FROM mohair LIMIT 1'
            const defaultMohairResult = await pool.query(defaultMohairSql)
            finalMohairId = defaultMohairResult.rows[0]?.mohair_id || 1
        }

        if (!finalMohairPositionId) {
            // Get first mohair_position_id as default if none provided
            const defaultMohairPosSql = 'SELECT mohair_position_id FROM mohair_position LIMIT 1'
            const defaultMohairPosResult = await pool.query(defaultMohairPosSql)
            finalMohairPositionId = defaultMohairPosResult.rows[0]?.mohair_position_id || 1
        }

        const generalRetractControlSql = `
            INSERT INTO general_retract_control (
                door_type,
                door_mount,
                opening_side,
                measurement_id,
                mesh_id,
                mohair_id,
                mohair_position_id,
                top_adapter_id,
                buildout_id,
                bottom_adapter_id,
                btm_adapter_color
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
            ) RETURNING general_retract_control_id
        `

        const generalRetractControlResult = await pool.query(generalRetractControlSql, [
            formData.door_type,           // $1
            formData.door_mount,          // $2
            formData.opening_side,        // $3
            primaryMeasurementId,         // $4
            meshId,                       // $5
            finalMohairId,                // $6
            finalMohairPositionId,        // $7
            topAdapterId,                 // $8
            buildoutId,                   // $9
            btmAdapterId,                 // $10
            formData.btm_adapter_color    // $11 - storing color name directly as VARCHAR
        ])

        const generalRetractControlId = generalRetractControlResult.rows[0].general_retract_control_id
        console.log('General retract control created with ID:', generalRetractControlId)

        // 20. INSERT into customization table
        // NOTE: New simplified schema - most fields moved to general_retract_control
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
                general_retract_control_id
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9
            ) RETURNING customization_id
        `

        const customizationResult = await pool.query(customizationSql, [
            productId,                  // $1
            primaryMeasurementId,       // $2
            frameSizeId,                // $3
            fastenerId,                 // $4
            colorId,                    // $5
            meshId,                     // $6
            productMeshId,              // $7
            mirage3500Id,               // $8
            generalRetractControlId     // $9 - foreign key to general_retract_control
        ])

        const customizationId = customizationResult.rows[0].customization_id

        console.log('Order saved with customization_id:', customizationId)

        // Create order entry (basic order record)
        // Provide required NOT NULL fields: order_date, estimated_date, estimated_cost, quantity
        const orderSql = `
            INSERT INTO public.order (order_date, estimated_date, estimated_cost, quantity)
            VALUES (CURRENT_DATE, CURRENT_DATE, 0.00, 1)
            RETURNING order_id
        `
        const orderResult = await pool.query(orderSql)
        const orderId = orderResult.rows[0].order_id

        // Create order_customization entry with is_estimate = TRUE
        const orderCustomizationSql = `
            INSERT INTO order_customization (
                order_id,
                customization_id,
                is_estimate,
                is_confirmed,
                is_completed,
                is_cancelled
            ) VALUES ($1, $2, TRUE, FALSE, FALSE, FALSE)
            RETURNING order_customization_id
        `
        await pool.query(orderCustomizationSql, [orderId, customizationId])

        console.log('Order_customization created with is_estimate = TRUE')

        // Create cust_order entry linking customer to order
        if (formData.customer_firstname && formData.customer_lastname) {
            // Get or create customer by name
            const customerId = await getOrCreateCustomer(formData.customer_firstname, formData.customer_lastname)

            // Get or create customer_address for this customer
            let customerAddressId

            // Check if customer already has an address
            const checkAddressSql = `
                SELECT customer_address_id
                FROM customer_address
                WHERE customer_id = $1
                LIMIT 1
            `
            const addressCheck = await pool.query(checkAddressSql, [customerId])

            if (addressCheck.rows.length > 0) {
                customerAddressId = addressCheck.rows[0].customer_address_id
            } else {
                // Create a default address for this customer
                const createAddressSql = `
                    INSERT INTO address (address_line1, address_line2, address_city, address_state, address_zip)
                    VALUES ('TBD', '', 'TBD', 'UT', '00000')
                    RETURNING address_id
                `
                const addressResult = await pool.query(createAddressSql)
                const addressId = addressResult.rows[0].address_id

                // Link address to customer
                const createCustAddressSql = `
                    INSERT INTO customer_address (customer_id, address_id)
                    VALUES ($1, $2)
                    RETURNING customer_address_id
                `
                const custAddressResult = await pool.query(createCustAddressSql, [customerId, addressId])
                customerAddressId = custAddressResult.rows[0].customer_address_id
            }

            // Create cust_order record
            const custOrderSql = `
                INSERT INTO cust_order (customer_id, order_id, customer_address_id)
                VALUES ($1, $2, $3)
                RETURNING cust_order_id
            `
            await pool.query(custOrderSql, [customerId, orderId, customerAddressId])
            console.log('cust_order created linking customer to order')
        }

        // Return the customization_id
        return {
            customization_id: customizationId
        }
    } catch (error) {
        console.error('Error in saveMirage3500Data:', error)
        throw error
    }
}

// Comprehensive function to save all Mirage data
async function saveMirageData(formData) {
    try {
        // 1. Handle mirage specific fields (if any specific table exists, otherwise generic)
        // For now assuming similar structure to Mirage 3500 but using 'mirage' table if needed
        // or just general_retract_control

        // 2. Handle main color
        const colorId = await getOrInsert('color', 'color_name', formData.color_name, 'color_id')

        // 3. Handle pivot pro color (if it exists in color table)
        // const pivotProColorId = await getOrInsert('color', 'color_name', formData.pivot_pro_color, 'color_id')

        // 4. Handle top adapter color
        const topAdapterColorId = await getOrInsert('color', 'color_name', formData.top_adapter_color, 'color_id')

        // 5. Handle bottom adapter color
        const btmAdapterColorId = await getOrInsert('color', 'color_name', formData.btm_adapter_color, 'color_id')

        // 6. Handle top adapter
        const topAdapterId = await getOrInsert('top_adapter', 'top_adapter_name', formData.top_adapter, 'top_adapter_id')

        // 7. Handle bottom adapter
        const btmAdapterId = await getOrInsert('bottom_adapter', 'bottom_adapter_name', formData.btm_adapter, 'bottom_adapter_id')

        // 8. Handle buildout (Mirage seems to have a single buildout field in the view?)
        // const buildoutId = await getOrInsert('buildout', 'buildout_name', formData.build_out, 'buildout_id')

        // 9. Handle mesh
        const meshId = await getOrInsert('mesh', 'mesh_type', formData.mesh, 'mesh_id')

        // 10. Handle mohair
        const mohairId = await getOrInsert('mohair', 'mohair_type', formData.mohair, 'mohair_id')

        // 11. Handle mohair position
        const mohairPositionId = await getOrInsert('mohair_position', 'mohair_position_name', formData.mohair_position, 'mohair_position_id')

        // 12. Get product_id for Mirage
        const productSql = 'SELECT product_id FROM product WHERE product_name = $1'
        const productResult = await pool.query(productSql, ['Mirage'])
        const productId = productResult.rows[0].product_id

        // 13. Create product_color and junction table entries for colors
        
        // Top adapter color
        let topAdapterColorJunctionId = null
        if (topAdapterColorId) {
            const topAdapterProductColorId = await getOrCreateProductColor(productId, topAdapterColorId)
            topAdapterColorJunctionId = await getOrCreateTopAdapterColor(topAdapterProductColorId)
        }

        // Bottom adapter color
        let btmAdapterColorJunctionId = null
        if (btmAdapterColorId) {
            const btmAdapterProductColorId = await getOrCreateProductColor(productId, btmAdapterColorId)
            btmAdapterColorJunctionId = await getOrCreateBottomAdapterColor(btmAdapterProductColorId)
        }

        console.log('Processing measurements...')

        // Top Opening Width (if applicable)
        // const topOpeningWidthId = await handleMeasurementWithJunction(...)

        // Opening Height (Mirage view has 'opening_height')
        const openingHeight = combineMeasurement(
            formData.opening_height,
            formData.opening_height_fraction
        )
        
        // Unit Height
        const unitHeight = combineMeasurement(
            formData.unit_height,
            formData.unit_height_fraction
        )

        // Pivot Pro Height
        const pivotProHeight = combineMeasurement(
            formData.pivot_pro_height,
            formData.pivot_pro_height_fraction
        )

        // Top Adapter Width
        const topAdapterWidth = combineMeasurement(
            formData.top_adapter_width,
            formData.top_adapter_width_fraction
        )

        // Bottom Adapter Width
        const btmAdapterWidth = combineMeasurement(
            formData.btm_adapter_width,
            formData.btm_adapter_width_fraction
        )

        // Build Out Dimension
        const buildOutDimension = combineMeasurement(
            formData.build_out_dimension,
            formData.build_out_dimension_fraction
        )

        console.log('All measurements processed successfully')

        // Get primary measurement_id (using opening_height_fraction as proxy if needed, or just 1)
        const primaryMeasurementId = await getMeasurementId(formData.opening_height_fraction) || 1

        // Get product_mesh_id
        const productMeshSql = 'SELECT product_mesh_id FROM product_mesh WHERE product_id = $1 AND mesh_id = $2'
        const productMeshResult = await pool.query(productMeshSql, [productId, meshId])

        let productMeshId
        if (productMeshResult.rows.length > 0) {
            productMeshId = productMeshResult.rows[0].product_mesh_id
        } else {
            const insertProductMeshSql = 'INSERT INTO product_mesh (product_id, mesh_id) VALUES ($1, $2) RETURNING product_mesh_id'
            const insertResult = await pool.query(insertProductMeshSql, [productId, meshId])
            productMeshId = insertResult.rows[0].product_mesh_id
        }

        // Defaults
        const defaultFastenerSql = 'SELECT fastener_id FROM fastener LIMIT 1'
        const fastenerResult = await pool.query(defaultFastenerSql)
        const fastenerId = fastenerResult.rows[0]?.fastener_id || 1

        const defaultFrameSizeSql = 'SELECT frame_size_id FROM frame_size LIMIT 1'
        const frameSizeResult = await pool.query(defaultFrameSizeSql)
        const frameSizeId = frameSizeResult.rows[0]?.frame_size_id || 1

        // Insert into general_retract_control
        // Note: Mirage might use different fields, but reusing structure for now
        
        // Get buildout_id from dimension
        const buildoutId = buildOutDimension ? await getOrInsert('buildout', 'buildout_name', buildOutDimension, 'buildout_id') : null

        let finalMohairId = mohairId || 1
        let finalMohairPositionId = mohairPositionId || 1

        const generalRetractControlSql = `
            INSERT INTO general_retract_control (
                measurement_id,
                mesh_id,
                mohair_id,
                mohair_position_id,
                top_adapter_id,
                buildout_id,
                bottom_adapter_id,
                btm_adapter_color
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8
            ) RETURNING general_retract_control_id
        `

        const generalRetractControlResult = await pool.query(generalRetractControlSql, [
            primaryMeasurementId,
            meshId,
            finalMohairId,
            finalMohairPositionId,
            topAdapterId,
            buildoutId,
            btmAdapterId,
            formData.btm_adapter_color
        ])

        const generalRetractControlId = generalRetractControlResult.rows[0].general_retract_control_id

        // Insert into customization
        // Note: Mirage might need a 'mirage_id' if there is a specific mirage table configuration
        // For now, we'll leave mirage_id null or handle it if you have a mirage table lookup
        
        const customizationSql = `
            INSERT INTO customization (
                product_id,
                measurement_id,
                frame_size_id,
                fastener_id,
                color_id,
                mesh_id,
                product_mesh_id,
                general_retract_control_id,
                is_estimate,
                is_confirmed
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, TRUE, FALSE
            ) RETURNING customization_id
        `

        const customizationResult = await pool.query(customizationSql, [
            productId,
            primaryMeasurementId,
            frameSizeId,
            fastenerId,
            colorId,
            meshId,
            productMeshId,
            generalRetractControlId
        ])

        const customizationId = customizationResult.rows[0].customization_id

        // Create order entry
        const orderSql = `
            INSERT INTO public.order (order_date, estimated_date, estimated_cost, quantity)
            VALUES (CURRENT_DATE, CURRENT_DATE, 0.00, 1)
            RETURNING order_id
        `
        const orderResult = await pool.query(orderSql)
        const orderId = orderResult.rows[0].order_id

        // Create order_customization entry
        const orderCustomizationSql = `
            INSERT INTO order_customization (
                order_id,
                customization_id,
                is_estimate,
                is_confirmed,
                is_completed,
                is_cancelled
            ) VALUES ($1, $2, TRUE, FALSE, FALSE, FALSE)
            RETURNING order_customization_id
        `
        await pool.query(orderCustomizationSql, [orderId, customizationId])

        // Create cust_order entry
        if (formData.customer_firstname && formData.customer_lastname) {
            const customerId = await getOrCreateCustomer(formData.customer_firstname, formData.customer_lastname)
            
            // Address handling (simplified)
            const createAddressSql = `
                INSERT INTO address (address_line1, address_line2, address_city, address_state, address_zip)
                VALUES ('TBD', '', 'TBD', 'UT', '00000')
                RETURNING address_id
            `
            const addressResult = await pool.query(createAddressSql)
            const addressId = addressResult.rows[0].address_id

            const createCustAddressSql = `
                INSERT INTO customer_address (customer_id, address_id)
                VALUES ($1, $2)
                RETURNING customer_address_id
            `
            const custAddressResult = await pool.query(createCustAddressSql, [customerId, addressId])
            const customerAddressId = custAddressResult.rows[0].customer_address_id

            const custOrderSql = `
                INSERT INTO cust_order (customer_id, order_id, customer_address_id)
                VALUES ($1, $2, $3)
                RETURNING cust_order_id
            `
            await pool.query(custOrderSql, [customerId, orderId, customerAddressId])
        }

        return { customization_id: customizationId }

    } catch (error) {
        console.error('Error in saveMirageData:', error)
        throw error
    }
}

// Function to confirm Mirage 3500 order
async function confirmMirage3500Order(customizationId) {
    try {
        // Update order_customization to set is_confirmed = TRUE
        // Both is_estimate and is_confirmed should be TRUE after confirmation (per Peter.txt line 64)
        const updateSql = `
            UPDATE order_customization
            SET is_confirmed = TRUE
            WHERE customization_id = $1
            RETURNING order_customization_id
        `
        const result = await pool.query(updateSql, [customizationId])

        if (result.rows.length === 0) {
            throw new Error('Order customization not found')
        }

        console.log('Order confirmed: is_confirmed set to TRUE for customization_id:', customizationId)
        return { customization_id: customizationId }
    } catch (error) {
        console.error('Error in confirmMirage3500Order:', error)
        throw error
    }
}

// Function to complete Mirage 3500 order
async function completeMirage3500Order(customizationId) {
    try {
        // Update order_customization to set is_completed = TRUE
        const updateSql = `
            UPDATE order_customization
            SET is_completed = TRUE
            WHERE customization_id = $1
            RETURNING order_customization_id
        `
        const result = await pool.query(updateSql, [customizationId])

        if (result.rows.length === 0) {
            throw new Error('Order customization not found')
        }

        console.log('Order completed: is_completed set to TRUE for customization_id:', customizationId)

        return { customization_id: customizationId }
    } catch (error) {
        console.error('Error in completeMirage3500Order:', error)
        throw error
    }
}

// Function to confirm Mirage order
async function confirmMirageOrder(customizationId) {
    try {
        const updateSql = `
            UPDATE order_customization
            SET is_confirmed = TRUE
            WHERE customization_id = $1
            RETURNING order_customization_id
        `
        const result = await pool.query(updateSql, [customizationId])

        if (result.rows.length === 0) {
            throw new Error('Order customization not found')
        }

        return { customization_id: customizationId }
    } catch (error) {
        console.error('Error in confirmMirageOrder:', error)
        throw error
    }
}

// Function to complete Mirage order
async function completeMirageOrder(customizationId) {
    try {
        const updateSql = `
            UPDATE order_customization
            SET is_completed = TRUE
            WHERE customization_id = $1
            RETURNING order_customization_id
        `
        const result = await pool.query(updateSql, [customizationId])

        if (result.rows.length === 0) {
            throw new Error('Order customization not found')
        }

        return { customization_id: customizationId }
    } catch (error) {
        console.error('Error in completeMirageOrder:', error)
        throw error
    }
}

// Generic function to complete any order
async function completeOrder(customizationId) {
    try {
        const updateSql = `
            UPDATE order_customization
            SET is_completed = TRUE
            WHERE customization_id = $1
            RETURNING order_customization_id
        `
        const result = await pool.query(updateSql, [customizationId])

        if (result.rows.length === 0) {
            throw new Error('Order customization not found')
        }

        console.log('Order completed: is_completed set to TRUE for customization_id:', customizationId)

        return { customization_id: customizationId }
    } catch (error) {
        console.error('Error in completeOrder:', error)
        throw error
    }
}

// Get Mohair options
async function getMohair() {
    try {
        const sql = 'SELECT DISTINCT mohair_id, mohair_type FROM mohair ORDER BY mohair_type'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting mohair:', error)
        return []
    }
}

// Get Mohair Positions
async function getMohairPositions() {
    try {
        const sql = 'SELECT DISTINCT mohair_position_id, mohair_position_name FROM mohair_position ORDER BY mohair_position_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting mohair positions:', error)
        return []
    }
}

// Get all customers
async function getAllCustomers() {
    try {
        const sql = 'SELECT customer_id, customer_firstname, customer_lastname FROM customer ORDER BY customer_firstname, customer_lastname'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting all customers:', error)
        return []
    }
}

// Get customer by ID
async function getCustomerById(customer_id) {
    try {
        const sql = 'SELECT * FROM customer WHERE customer_id = $1'
        const result = await pool.query(sql, [customer_id])
        return result.rows[0] || null
    } catch (error) {
        console.error('Error getting customer by ID:', error)
        return null
    }
}

// Create a new customer
async function createCustomer(firstname, lastname) {
    try {
        const sql = 'INSERT INTO customer (customer_firstname, customer_lastname) VALUES ($1, $2) RETURNING customer_id, customer_firstname, customer_lastname'
        const result = await pool.query(sql, [firstname, lastname])
        return result.rows[0]
    } catch (error) {
        console.error('Error creating customer:', error)
        throw error
    }
}

// Get or create customer
async function getOrCreateCustomer(firstname, lastname) {
    try {
        // Check if customer exists
        const selectSql = 'SELECT customer_id FROM customer WHERE customer_firstname = $1 AND customer_lastname = $2'
        const selectResult = await pool.query(selectSql, [firstname, lastname])

        if (selectResult.rows.length > 0) {
            return selectResult.rows[0].customer_id
        }

        // Create new customer
        const insertSql = 'INSERT INTO customer (customer_firstname, customer_lastname) VALUES ($1, $2) RETURNING customer_id'
        const insertResult = await pool.query(insertSql, [firstname, lastname])
        return insertResult.rows[0].customer_id
    } catch (error) {
        console.error('Error in getOrCreateCustomer:', error)
        throw error
    }
}

// Get Cord Lengths
async function getCordLengths() {
    try {
        const sql = 'SELECT cord_length_id, cord_length_name FROM cord_length ORDER BY cord_length_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting cord lengths:', error)
        return []
    }
}

// Get Mount Types
async function getMountTypes() {
    try {
        const sql = 'SELECT mount_type_id, mount_type_name FROM mount_type ORDER BY mount_type_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting mount types:', error)
        return []
    }
}

// Get Right Tracks
async function getTracks() {
    try {
        const sql = 'SELECT right_track_id, right_track_name FROM right_track ORDER BY right_track_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting tracks:', error)
        return []
    }
}

// Get Left Tracks
async function getLeftTracks() {
    try {
        const sql = 'SELECT left_track_id, left_track_name FROM left_track ORDER BY left_track_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting left tracks:', error)
        return []
    }
}

// Get Top Opening Widths
async function getTopOpeningWidths() {
    try {
        const sql = 'SELECT top_opening_width_id, top_opening_width_name FROM top_opening_width ORDER BY top_opening_width_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting top opening widths:', error)
        return []
    }
}

// Get Top Levels
async function getTopLevels() {
    try {
        const sql = 'SELECT top_level_id, top_level_name FROM top_level ORDER BY top_level_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting top levels:', error)
        return []
    }
}

// Get Bottom Opening Widths
async function getBottomOpeningWidths() {
    try {
        const sql = 'SELECT bottom_opening_width_id, bottom_opening_width_name FROM bottom_opening_width ORDER BY bottom_opening_width_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting bottom opening widths:', error)
        return []
    }
}

// Get Bottom Levels
async function getBottomLevels() {
    try {
        const sql = 'SELECT bottom_level_id, bottom_level_name FROM bottom_level ORDER BY bottom_level_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting bottom levels:', error)
        return []
    }
}

// Get Left Opening Heights
async function getLeftOpeningHeights() {
    try {
        const sql = 'SELECT left_opening_height_id, left_opening_height_name FROM left_opening_height ORDER BY left_opening_height_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting left opening heights:', error)
        return []
    }
}

// Get Right Opening Heights
async function getRightOpeningHeights() {
    try {
        const sql = 'SELECT right_opening_height_id, right_opening_height_name FROM right_opening_height ORDER BY right_opening_height_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting right opening heights:', error)
        return []
    }
}

// Get Left Plumbs
async function getLeftPlumbs() {
    try {
        const sql = 'SELECT left_plumb_id, left_plumb_name FROM left_plumb ORDER BY left_plumb_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting left plumbs:', error)
        return []
    }
}

// Get Starting Points
async function getStartingPoints() {
    try {
        const sql = 'SELECT starting_point_id, starting_point_name FROM starting_point ORDER BY starting_point_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting starting points:', error)
        return []
    }
}

// Get Add Buildouts
async function getAddBuildouts() {
    try {
        const sql = 'SELECT buildout_id, buildout_name FROM buildout ORDER BY buildout_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting add buildouts:', error)
        return []
    }
}

// Get Right Plumbs
async function getRightPlumbs() {
    try {
        const sql = 'SELECT right_plumb_id, right_plumb_name FROM right_plumb ORDER BY right_plumb_name'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        console.error('Error getting right plumbs:', error)
        return []
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
    completeMirage3500Order,
    saveMirageData,
    confirmMirageOrder,
    completeMirageOrder,
    completeOrder,
    getOrInsert,
    getColors,
    getHandles,
    getTopAdapters,
    getBottomAdapters,
    getRightBuildouts,
    getLeftBuildouts,
    getMeshTypes,
    getColors,
    getColorsByProduct,
    getMohair,
    getMohairPositions,
    getAllCustomers,
    createCustomer,
    getCustomerById,
    getOrCreateCustomer,
    getRainierPlacements,
    getRainierColors,
    getHardwareColors,
    getRainierFabricColors,
    getHousingSeries,
    getDriveSides,
    getHembars,
    getPileBrushes,
    getBrushLocations,
    getZipperColors,
    getCordLengths,
    getMountTypes,
    getTracks,
    getLeftTracks,
    getTopOpeningWidths,
    getTopLevels,
    getBottomOpeningWidths,
    getBottomLevels,
    getLeftOpeningHeights,
    getRightOpeningHeights,
    getLeftPlumbs,
    getStartingPoints,
    getAddBuildouts,
    getRightPlumbs,
    getPivotProColors
}