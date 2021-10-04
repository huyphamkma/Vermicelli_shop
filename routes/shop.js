const express = require('express')
const route = express.Router()
const shopController = require('../controllers/shopController')


route.get('/detail/:slug', shopController.detail)
route.get('/categories/:breed/:page', shopController.paginationFilter)
route.get('/categories/:breed', shopController.filter)
route.get('/:page', shopController.pagination)
route.get('/', shopController.index)


module.exports = route