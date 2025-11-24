const pool = require('../database/')


async function getFrameSizes() {
    try {
        const sql = 'SELECT size_type FROM frame_size;'
        const frame_sizes = await pool.query(sql)
        return frame_sizes.rows
    } catch (error) {
        return error.message
    }
}
async function getFasteners() {
    try {
        const sql = 'SELECT fastener_type FROM fastener;'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        return error.message
    }
}

async function getTabSpring() {
    try {
        const sql = 'SELECT tab_spring_name FROM tab_spring;'
        const result = await pool.query(sql)
        return result.rows
    } catch (error) {
        return error.message
    }
}

module.exports = {
    getFrameSizes,
    getFasteners,
    getTabSpring
}