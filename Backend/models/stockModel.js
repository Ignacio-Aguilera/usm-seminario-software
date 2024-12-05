var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StockModel = new Schema({
    sucursal: { 
        type: Schema.Types.ObjectId, 
        ref: 'sucursals' 
    },
    producto: { 
        type: Schema.Types.ObjectId, 
        ref: 'productos' 
    },
    stock: {
        type: Number,
        required: true
    },
    stock_critico: {
        type: Number
    }
});

module.exports = mongoose.model('stocks', StockModel);
