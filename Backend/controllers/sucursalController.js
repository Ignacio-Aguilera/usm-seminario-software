var sucursalController = function(Sucursal) {
    
    var post = async function(req, res) {
        try {
            var sucursal = new Sucursal(req.body);
            await sucursal.save();
            res.status(201).send('Sucursal agregada');
        } catch (err) {
            res.status(400).send('Error al agregar sucursal: ' + err.message);
        }
    };

    var get = async function(req, res) {
        try {
            var query = {};
            var sucursals = await Sucursal.find(query);
            var returnSucursals = sucursals.map(sucursal => {
                var newSucursal = sucursal.toJSON();
                newSucursal.links = {
                    self: 'http://' + req.headers.host + '/api/sucursal/' + newSucursal._id
                };
                return newSucursal;
            });
            res.json(returnSucursals);
        } catch (err) {
            res.status(500).send('Error al obtener sucursales: ' + err.message);
        }
    };

    return {
        post: post,
        get: get
    };
};

module.exports = sucursalController;
