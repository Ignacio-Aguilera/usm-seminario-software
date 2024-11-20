const express = require('express')
const productoRouter = express.Router()

const {ProductoController} = require('../controllers/productoController.js')

productoRouter.get('/'             , ProductoController.getAllProductos)
productoRouter.post('/'            , ProductoController.createProducto) 
productoRouter.use('/:productoId'  , ProductoController.validarExistenciaProducto)
productoRouter.get('/:productID'   , ProductoController.getProducto)
productoRouter.put('/:productID'   , ProductoController.updateProducto) 
productoRouter.delete('/:productID', ProductoController.deleteProduto)
productoRouter.patch('/:productID' , ProductoController.patchProducto)

module.exports = productoRouter