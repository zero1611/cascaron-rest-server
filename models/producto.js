const mongoose = require("mongoose");
const {Schema, model} = require('mongoose')

const PrpductoSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required:  true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: {
        type: String,
    },
    disponible: {
        type: Boolean,
        default: true
    },
    img:{
        type: String
    },

});
PrpductoSchema.methods.toJSON = function () {

    const{__v,_id,...producto} = this.toObject();

    producto.pid = _id;

    return producto;
}
module.exports = model('Producto', PrpductoSchema)