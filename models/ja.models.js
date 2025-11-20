async function getFrameSizes() {
    try {
        const sql = 'SELECT frame_size_id FROM frame_size;'
        const frame_sizes = await pool.query(sql)
        // console.log(frame_sizes)
        // console.log(frame_sizes.rows)
        return frame_sizes.rows
    } catch (error) {
        return error.message
    }
}