const Producto = require("../models/productoModel");


class ProductoController{

	/*-----------------------------*/
	static async getAllProductos(req, res){

		var query = {};
		
		var productos = await Producto.find(query);
	
		var returnProductos = [];
				
		productos.forEach(function(element){
			
			var newProducto = element.toJSON();
			
			newProducto.links = {};
			
			newProducto.links.self = 'http://' + req.headers.host + '/api/Producto/' + newProducto._id;
			
			returnProductos.push(newProducto);
			
		});
		
		res.json(returnProductos);
	};


	/*-----------------------------*/
	static async validarExistenciaProducto(req, res, next){
		
		var productoToFind = new Producto();

		productoToFind._id = req.params.productoId;

		var producto = await Producto.findOne(productoToFind);
		
		if (producto) {
				
			req.producto = producto;
			
			next();
			
		}
		else {
			
			res.status(404).send('no producto found');
			
		}
	};


	/*-----------------------------*/
	static async getProducto (req, res){
		var returnProducto = req.producto.toJSON();
		res.json(returnProducto);
	};


	/*-----------------------------*/
	static async createProducto(req, res){
		var producto = new Producto(req.body);
		await producto.save();
		res.status(200).send('Producto agregado');
	};


	/*-----------------------------*/
	static async updateProducto(req, res){
			
		req.producto._id = req.body._id;
	
		req.producto.productoCodigo = req.body.productoCodigo;
				
		req.producto.productoNombre = req.body.productoNombre;
		
		req.producto.productoDescripcion = req.body.productoDescripcion;
	
		var productoToFind = new Producto();
	
		productoToFind._id = req.producto._id;
	
		var result = await Producto.updateOne(productoToFind, req.producto);
		
		if (!result.acknowledged) {
		
			res.status(500).send('Producto no modificado');
		
		}
		else {
		
			res.status(200).send('Producto modificado');
	
		}
	}
	

	/*-----------------------------*/
	static async patchProducto(req, res){

		var productoToFind = new Producto();

		productoToFind._id = req.body._id;

		if (req.body._id) {
			
			delete req.body._id;
			
		}

		var result = await Producto.findOneAndUpdate(productoToFind, req.body, {
			includeResultMetadata: true
		});

		if (result.ok === 0) {
		
			res.status(500).send('Producto no modificado');
		
		}
		else {
		
			res.json(req.body);
	
		}
		
	}

	/*-----------------------------*/
	static async deleteProduto(req, res){
				
		var productoToFind = new Producto();
	
		productoToFind._id = req.producto._id;
	
		var result = await Producto.deleteOne(productoToFind);
		
		if (!result.acknowledged) {
		
			res.status(500).send('Producto no eliminado');
		
		}
		else {
		
			res.status(200).send('Producto eliminado');
	
		}
		
	};
};


module.exports = {
	ProductoController
}

