const Sucursal = require("../models/sucursalModel");

class SucursalController{

	/*-----------------------------*/
	static async getAllSucursales(req, res){
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


	/*-----------------------------*/
	static async validarExistenciaSucursal(req, res, next){
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
	};


	/*-----------------------------*/
	static async getSucursal (req, res){
        res.json(req.sucursal);
	};


	/*-----------------------------*/
	static async createSucursal(req, res){
        try {
            var sucursal = new Sucursal(req.body);
            await sucursal.save();
            res.status(201).send('Sucursal agregada');
        } catch (err) {
            res.status(400).send('Error al agregar sucursal: ' + err.message);
        }
	};


	/*-----------------------------*/
	static async updateSucursal(req, res){
        try {
            Object.assign(req.sucursal, req.body);
            await req.sucursal.save();
            res.status(200).send('Sucursal actualizada');
        } catch (err) {
            res.status(400).send('Error al actualizar sucursal: ' + err.message);
        }
	}


	/*-----------------------------*/
	static async deleteSucursal(req, res){
        var sucursalToFind = new Sucursal();
	
        sucursalToFind._id = req.sucursal._id;
    
        var result = await Sucursal.deleteOne(sucursalToFind);
        
        if (!result.acknowledged) {
        
            res.status(500).send('Sucursal no eliminado');
        
        }
        else {
    
            res.status(200).send('Sucursal eliminado');
    
        }
	};
};


module.exports = {
	SucursalController
}