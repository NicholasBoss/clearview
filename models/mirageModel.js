async function getTopAdapters() {
    try {
        // Update sql with your query
        const top_adapters = 'SELECT top_adapter_name FROM top_adapter'

        const top_adapter = await pool.query(top_adapters)
        return top_adapter.rows
    } catch (error) {
        console.error('Error executing functionName:', error)
        throw error
    }
}

async function getTopAdapterColor(product_name) {
    try {
        const topAdapterColorSql = `
            SELECT c.color_id, c.color_name 
            FROM color c
            INNER JOIN product_color pc ON c.color_id = pc.color_id
            INNER JOIN product p ON pc.product_id = p.product_id
            INNER JOIN top_adapter_color AS tac ON pc.product_color_id = tac.product_color_id
            WHERE p.product_name = $1
            ORDER BY c.color_name;
            `

            // product to product color to pivot pro color to color
            const topAdapterColorResult = await pool.query(topAdapterColorSql, [product_name])
        return topAdapterColorResult.rows
    } catch (error) {
        return error.message
    }
}

async function getBottomAdapterColor(product_name) {
    try {
        const bottomAdapterColorSql = `
            SELECT c.color_id, c.color_name 
            FROM color c
            INNER JOIN product_color pc ON c.color_id = pc.color_id
            INNER JOIN product p ON pc.product_id = p.product_id
            INNER JOIN bottom_adapter_color AS tac ON pc.product_color_id = tac.product_color_id
            WHERE p.product_name = $1
            ORDER BY c.color_name;
            `

            // product to product color to pivot pro color to color
        const bottomAdapterColorResult = await pool.query(bottomAdapterColorSql, [product_name])
        return bottomAdapterColorResult.rows
    } catch (error) {
        return error.message
    }
}

async function getBottomAdapters() {
    try {
        // Update sql with your query
        const bottom_adapters = 'SELECT bottom_adapter_name FROM bottom_adapter'

        const bottom_adapter = await pool.query(bottom_adapters)
        return bottom_adapter.rows
    } catch (error) {
        console.error('Error executing functionName:', error)
        throw error
    }
}

async function getBuildOut() {
    try {
        // Update sql with your query
        const buildouts = 'SELECT buildout_name FROM buildout'

        const buildout = await pool.query(buildouts)
        return buildout.rows
    } catch (error) {
        console.error('Error executing functionName:', error)
        throw error
    }
}

async function getMesh() {
    try {
        // Update sql with your query
        const meshes = 'SELECT mesh_type FROM mesh'

        const mesh = await pool.query(meshes)
        return mesh.rows
    } catch (error) {
        console.error('Error executing functionName:', error)
        throw error
    }
}