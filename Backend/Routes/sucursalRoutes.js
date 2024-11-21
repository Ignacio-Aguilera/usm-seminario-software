const express = require('express')
const sucursalRouter = express.Router()

const {SucursalController} = require('../controllers/sucursalController.js')

sucursalRouter.get('/'              , SucursalController.getAllSucursales)
sucursalRouter.post('/'             , SucursalController.createSucursal) 
sucursalRouter.use('/:sucursalId'   , SucursalController.validarExistenciaSucursal)
sucursalRouter.get('/:sucursalId'   , SucursalController.getSucursal)
sucursalRouter.put('/:sucursalId'   , SucursalController.updateSucursal) 
sucursalRouter.delete('/:sucursalId', SucursalController.deleteSucursal)

module.exports = sucursalRouter
