 var mongoose = require('mongoose');
 
 var Schema = mongoose.Schema;
 
 var productoModel = new Schema({
	 
	 productoCodigo: {
		 
		 type: String
		 
	 },
	 
	 productoNombre: {
		 
		 type: String
		 
	 },
	 
	 productoDescripcion: {
		 
		 type: String
		 
	 }
	 
 });
 
 module.exports = mongoose.model('productos', productoModel);