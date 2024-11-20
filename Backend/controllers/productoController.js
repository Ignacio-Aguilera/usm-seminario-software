var productoController = function(Producto) {
	
	var post = async function(req, res){
		var producto = new Producto(req.body);
		await producto.save();
		res.status(200).send('Producto agregado');
	};
	
	
	var get = async function(req, res){
			
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
	
	return {
		
		post: post,
		
		get: get
		
	};
	
};

module.exports = productoController;