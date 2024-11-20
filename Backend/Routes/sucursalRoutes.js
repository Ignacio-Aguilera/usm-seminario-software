var express = require('express');

var routes = function(Sucursal) {
    var sucursalRouter = express.Router();

    var sucursalController = require('../controllers/sucursalController')(Sucursal);

    sucursalRouter.route('/')
        .post(sucursalController.post)
        .get(sucursalController.get);

    sucursalRouter.use('/:sucursalId', async function(req, res, next) {
        try {
            var sucursal = await Sucursal.findById(req.params.sucursalId);
            if (sucursal) {
                req.sucursal = sucursal;
                next();
            } else {
                res.status(404).send('Sucursal no encontrada');
            }
        } catch (err) {
            res.status(500).send('Error al buscar sucursal: ' + err.message);
        }
    });

    sucursalRouter.route('/:sucursalId')
        .get(function(req, res) {
            res.json(req.sucursal);
        })

        .put(async function(req, res) {
            try {
                Object.assign(req.sucursal, req.body);
                await req.sucursal.save();
                res.status(200).send('Sucursal actualizada');
            } catch (err) {
                res.status(400).send('Error al actualizar sucursal: ' + err.message);
            }
        })

        .delete(async function(req, res) {

            var sucursalToFind = new Sucursal();
	
            sucursalToFind._id = req.sucursal._id;
        
            var result = await Sucursal.deleteOne(sucursalToFind);
            
            if (!result.acknowledged) {
            
                res.status(500).send('Sucursal no eliminado');
            
            }
            else {
        
                res.status(200).send('Sucursal eliminado');
        
            }
        });

    return sucursalRouter;
};

module.exports = routes;
