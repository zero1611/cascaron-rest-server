const mongoose = require("mongoose");
const {Schema, model} = require('mongoose')

const Categoriachema = Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
});
Categoriachema.methods.toJSON = function () {

    const{__v,_id,...categoria} = this.toObject();

    categoria.cid = _id;

    return categoria;
}
module.exports = model('Categoria', Categoriachema)