var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SucursalModel = new Schema({
    sucursalId: {
        type: String,
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

module.exports = mongoose.model('sucursals', SucursalModel);
