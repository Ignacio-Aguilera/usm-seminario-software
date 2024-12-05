const express = require('express')
const stockRouter = express.Router()

const {StockController} = require('../controllers/stockController.js')

stockRouter.get('/producto/:idObjProducto', StockController.obtenerStocksAsociadosAProducto)
stockRouter.get('/sucursal/:idObjSucursal', StockController.obtenerStocksAsociadosASurcursal)
stockRouter.get('/'           , StockController.obtenerTodos)
stockRouter.post('/'          , StockController.crearStock)
stockRouter.use('/:stockID'   , StockController.validarExistenciaStock)
stockRouter.get('/:stockID'   , StockController.obtenerStockPorId)
stockRouter.put('/:stockID'   , StockController.updateStock) 
stockRouter.delete('/:stockID', StockController.deleteStock)

module.exports = stockRouter