const Stock = require("../models/stockModel");


class StockController {

	/*-----------------------------*/
	static async obtenerTodos(request, response) {

		let stocks = await Stock.find({}).populate('sucursal').populate('producto').exec()

		var stocksFormateados = []

		stocks.forEach(function (stock) {
			var stockAsJson = stock.toJSON()
			stocksFormateados.push(stockAsJson)
		})

		response.json(stocksFormateados)
	};

	/*-----------------------------*/
	static async obtenerStocksAsociadosAProducto(request, response) {
		var idObjProducto = request.params.idObjProducto 

		let stocks = await Stock.find({"producto":idObjProducto}).populate('sucursal').populate('producto').exec()

		var stocksFormateados = []

		stocks.forEach(function (stock) {
			stocksFormateados.push(stockAsJson)
		})

		response.json(stocksFormateados)
	};

	/*-----------------------------*/
	static async obtenerStocksAsociadosASurcursal(request, response) {
		var idObjSucursal = request.params.idObjSucursal
		let stocks = await Stock.find({"sucursal": idObjSucursal}).populate('sucursal').populate('producto').exec()

		var stocksFormateados = []

		stocks.forEach(function (stock) {
			var stockAsJson = stock.toJSON()
			stocksFormateados.push(stockAsJson)
		})

		response.json(stocksFormateados)
	};


	/*-----------------------------*/
	static async validarExistenciaStock(request, response, next) {

		var stockABuscar = new Stock()
		stockABuscar._id = request.params.stockID

		var stock = await Stock.findOne(stockABuscar).populate('sucursal').populate('producto').exec()

		if (!stock) {
			response.status(404).send(`No se ha encontrado el stock con id ${request.params.stockID}`)
		}

		//console.log(stock)
		request.stockEncontrado = stock.toJSON()
		next(); //Avanza a la url solicitada ya que se valido la existencia del stock, y se envia stock via request
	};


	/*-----------------------------*/
	static async obtenerStockPorId(request, response) {
		var stockFormateado = request.stockEncontrado
		response.json(stockFormateado)
	};


	/*-----------------------------*/
	static async crearStock(request, response) {
		try{

			var request_body = request.body
			var nuevoStock = new Stock()
	
			nuevoStock.sucursal = request_body.sucursal
			nuevoStock.producto = request_body.producto
			nuevoStock.stock    = request_body.stock
			nuevoStock.stock_critico = request_body.stock_critico
			
			await nuevoStock.save();
			response.status(200).send('Stock ha sido ingresado correctamente');

		} catch (error) {

			response.status(500).send('Hubo problemas al intentar ingresar el stock')
		
		}
	};


	/*-----------------------------*/
	static async updateStock(request, response) {

		request.stockEncontrado._id           = request.body._id;
		request.stockEncontrado.sucursal      = request.body.sucursal;
		request.stockEncontrado.producto      = request.body.producto;
		request.stockEncontrado.stock         = request.body.stock;
		request.stockEncontrado.stock_critico = request.body.stock_critico;

		var stockBusqueda = new Stock();
		stockBusqueda._id = request.stockEncontrado._id;

		var result = await Stock.updateOne(stockToFind, request.stockEncontrado);

		if (!result.acknowledged) {
			response.status(500).send('Stock no modificado');
		} else {
			response.status(200).send('Stock modificado');
		}
	}


	/*-----------------------------*/
	static async deleteStock(request, response) {

		var stockBusqueda = new Stock();
		stockBusqueda._id = request.stockEncontrado._id;

		var result = await Stock.deleteOne(stockBusqueda);

		if (!result.acknowledged) {
			response.status(500).send('Stock no eliminado');
		}else {
			response.status(200).send('Stock eliminado');
		}

	};
};


module.exports = {
	StockController
}

