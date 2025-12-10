const accountModel = require('../models/accountModel')
const ordersModel = require('../models/ordersModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { link } = require('../routes/static')
const e = require('connect-flash')
const { render } = require('ejs')
const env = require("dotenv").config()
require('dotenv').config()

/* ***********************
 * Build Orders Page
*************************/
async function buildAdmin(req, res){
    try {
        // Get all orders for this user
        const orders = await ordersModel.getOrders();

        // Get all customers for filtering
        const customers = await ordersModel.getAllCustomers();
        // const messages = await messageModel.getAllMessages()
        // const menu = await menuModel.getAllMenuItems()
        res.render("admin/orders", {
            title: "Admin",
            link: "admin",
            section: "account",
            orders: orders,
            customers: customers,
            errors: null
        })
    } catch (err) {
        res.render("errors/error", {
            title: err.status || 'Server Error',
            link: "error",
            section: "error",
            message: err.message
        })
    }
}

module.exports = {
    buildAdmin
}