var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SucursalModel = new Schema({
    sucursalId: {
        type: Number,
        required: true
    },
    sucursalNombre: {
        type: String,
        required: true
    },
    sucursalDireccion: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Sucursal', SucursalModel);
