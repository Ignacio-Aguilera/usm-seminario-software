var express = require('express');
 
var routes = function(Producto){
	 
	var productoRouter = express.Router();
	
	var productoController = require('../controllers/productoController')(Producto);

	productoRouter.route('/')
		.post(productoController.post)
		.get(productoController.get);


	productoRouter.use('/:productoId', async function(req, res, next){
		
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
		
	});
	
	productoRouter.route('/:productoId')
		.get(function(req, res){
			
			var returnProducto = req.producto.toJSON();
			
			res.json(returnProducto);
			
		})
		.put(async function(req, res){
			
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
			
		})
		.patch(async function(req, res){

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
			
		})
		.delete(async function(req, res){
			
			var productoToFind = new Producto();

			productoToFind._id = req.producto._id;

			var result = await Producto.deleteOne(productoToFind);
			
			if (!result.acknowledged) {
			
				res.status(500).send('Producto no eliminado');
			
			}
			else {
			
				res.status(200).send('Producto eliminado');
		
			}
			
		});
			
		 return productoRouter;
	 
 };
 
 module.exports = routes;