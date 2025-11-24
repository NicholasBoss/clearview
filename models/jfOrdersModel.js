const pool = require('../database/')


async function getPlacement() {
    try {
        const sql = `
            SELECT DISTINCT p.placement_id, p.placement_name
            FROM placement p
            ORDER BY p.placement_name;
        `
        const placement = await pool.query(sql)
        return placement.rows
    } catch (error) {
        return error.message
    }

}

async function getHousing(){
    try {
        const sql = `
            SELECT DISTINCT h.housing_series_name
            FROM housing h
            ORDER BY h.housing_series_name ASC;
        `
        const placement = await pool.query(sql)
        return placement.rows
    } catch (error) {
        return error.message
    }
}

async function getdriveSide() {
    try {
        const sql = `
            SELECT DISTINCT ds.drive_side_name
            FROM drive_side ds
            ORDER BY ds.drive_side_name ASC;
        `
        const placement = await pool.query(sql)
        return placement.rows
    } catch (error) {
        return error.message
    }
}

async function gethembar() {
    try {
            const sql = `
                SELECT DISTINCT he.hembar_name
                FROM hembar he
                ORDER BY he.hembar_name ASC;
            `
            const placement = await pool.query(sql)
            return placement.rows
    } catch (error) {
        error.message
    }
}

async function getpilebrush() {
    try {
            const sql = `
                SELECT DISTINCT pi.pilebrush_name
                FROM pilebrush pi
                ORDER BY pi.pilebursh_name ASC;
            `
            const placement = await pool.query(sql)
            return placement.rows
    } catch (error) {
        error.message
    }
}

async function getbrushLocation() {
    try {
            const sql = `
                SELECT DISTINCT bl.brush_location_name
                FROM brush_location bl
                ORDER BY bl.brush_location_name ASC;
            `
            const placement = await pool.query(sql)
            return placement.rows
    } catch (error) {
        error.message
    }
}

async function getzipperColor() {
    try {
            const sql = `
                SELECT DISTINCT co.color_name
                FROM rainier_zipper_color zc
                    INNER JOIN product p ON zc.product_color_id = p.product_color_id
                    INNER JOIN color co ON p.color_id = co.color_id
                ORDER BY co.color_name ASC;
            `
            const placement = await pool.query(sql)
            return placement.rows
    } catch (error) {
        error.message
    }
}

async function getcordLength() {
    try {
            const sql = `
                SELECT DISTINCT cl.cord_length_name
                FROM cord_length cl
                ORDER BY cl.cord_length ASC;
            `
            const placement = await pool.query(sql)
            return placement.rows
    } catch (error) {
        error.message
    }
}

async function getmountTypes() {
    try {
            const sql = `
                SELECT DISTINCT mt.mount_type_name
                FROM mount_type mt
                ORDER BY mt.mount_type_name ASC;
            `
            const placement = await pool.query(sql)
            return placement.rows
    } catch (error) {
        error.message
    }
}

async function getleftBuildout() {
    try {
            const sql = `
                SELECT DISTINCT lb.left_buildout_name
                FROM left_buildout lb
                ORDER BY lb.left_buildout_name ASC;
            `
            const placement = await pool.query(sql)
            return placement.rows
    } catch (error) {
        error.message
    }
}

async function getrightBuildout() {
    try {
            const sql = `
                SELECT DISTINCT right_buildout_name
                FROM right_buildout rb
                ORDER BY rb.right_buildout_name ASC;
            `
            const placement = await pool.query(sql)
            return placement.rows
    } catch (error) {
        error.message
    }
}

async function getleftTrack() {
    try {
            const sql = `
                SELECT DISTINCT lt.left_track_name
                FROM left_track lt
                ORDER BY lt.left_track_name ASC;
            `
            const placement = await pool.query(sql)
            return placement.rows
    } catch (error) {
        error.message
    }
}

async function getrightTrack() {
    try {
            const sql = `
                SELECT DISTINCT rt.right_track_name
                FROM right_track rt
                ORDER BY rt.right_track_name ASC;
            `
            const placement = await pool.query(sql)
            return placement.rows
    } catch (error) {
        error.message
    }
}

module.exports = {
    getPlacement,
    getHousing,
    getdriveSide,
    gethembar,
    getpilebrush,
    getbrushLocation,
    getzipperColor,
    getcordLength,
    getmountTypes,
    getleftBuildout,
    getrightBuildout,
    getleftTrack,
    getrightTrack
}