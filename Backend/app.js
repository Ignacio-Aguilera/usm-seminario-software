//========== Importación de modulos
var express    = require('express');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var path       = require('path');
var cors       = require('cors')


//========== Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/AplicacionWeb');


//========== Inicializacion de modelos
var Producto = require('./models/productoModel');
var Sucursal = require('./models/sucursalModel');

//========== Inicializacion de webapp
var app = express();
var port = process.env.PORT || 3000;



//========= Configuracion de retorno
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

//========= Implementacion de controladores 
var productoRouter = require('./Routes/productoRoutes')(Producto);
app.use('/api/Producto', productoRouter);

var sucursalRouter = require('./Routes/sucursalRoutes')(Sucursal);
app.use('/api/Sucursal', sucursalRouter);

//======== Ejecucion de webapps
app.listen(port, function(){
	console.log('Running on PORT: ' + port);
});