const express = require('express')
const route = express.Router()
const siteController = require('../controllers/siteController')

route.get('/contact', siteController.contact)
// route.post('/contact', siteController.sendEmail)
route.get('/login', siteController.login)
route.post('/login', siteController.authen)
route.get('/', siteController.index)




module.exports = route
