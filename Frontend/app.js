//========== Importación de modulos
var express    = require('express');
var bodyParser = require('body-parser');
var path       = require('path');
const nunjucks = require('nunjucks')



//========== Inicializacion de webapp
var app = express();
var port = process.env.PORT || 80;


//========= Configuracion de retorno
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

nunjucks.configure('views', {
	autoescape: true,
	express: app
})
  
app.set('view engine', 'html')


//========= Configurar static folder front elements
app.use("/front", express.static(__dirname + '/src'));


//========= Implementacion de llamado de acciones en duro
app.get('/'                      , function(req, res) { res.redirect("/productos.html")                                   ; });
app.get('/productos.html'        , function(req, res) { res.render('productos/index.html') });
app.get('/agregarProducto.html'  , function(req, res) { res.render('productos/agregar.html')   ; });
app.get('/modificarProducto.html', function(req, res) { res.render('productos/modificar.html')  ; });
app.get('/jquery-1.12.1.min.js'  , function(req, res) { res.sendFile('src/js/jquery/jquery-1.12.1.min.js')  ; });


app.get('/sucursales.html'        , function(req, res) { res.render('sucursales/index.html')     ; });
app.get('/agregarSucursal.html'  ,  function(req, res) { res.render('sucursales/agregar.html')   ; });
app.get('/modificarSucursal.html',  function(req, res) { res.render('sucursales/modificar.html')  ; });

//======== Ejecucion de webapps
app.listen(port, function(){
	console.log('Running on PORT: ' + port);
});