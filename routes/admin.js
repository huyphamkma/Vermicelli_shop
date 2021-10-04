const express = require('express')
const route = express.Router()
const adminController = require('../controllers/adminController')




route.get('/edit/:id', adminController.authen, adminController.edit)
route.put('/edit/:id', adminController.authen, adminController.update)
route.delete('/:id', adminController.authen, adminController.delete)
route.get('/create', adminController.authen, adminController.showFormCreate)
route.post('/create', adminController.authen, adminController.create)
route.get('/', adminController.authen, adminController.index)



module.exports = route