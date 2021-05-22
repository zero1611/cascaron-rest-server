const Role = require('../models/role');
const User = require('../models/user')
const res = require("express");
const {Categoria,Producto} = require("../models/indexx");
const esRoleValid = async (rol ='') =>{
    const  existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

// Verificar si el correo existe
const esEmailValid = async (correo ='') =>{
    const existeEmail = await User.findOne({correo});
    if (existeEmail){
        throw new Error (`El correo: ${correo} ya esta registado en el sistema, intente con otro`)
    }
}
const esUserValid = async (id) =>{
    const existeUser = await User.findById(id);
    if (!existeUser){
        throw new Error (`El id: ${id} no existe en los registros`);
    }
}

const existeCategoria = async (id)=>{
    const exisCat = await Categoria.findById(id)

    if (!exisCat){
        throw new Error (`El id: ${id} no existe en los registros`);
    }
}

const existeProducto = async (id)=>{
    const exisProd = await Producto.findById(id)
    if (!exisProd){
        throw new Error (`El id: ${id} no existe en los registros`);
    }
}
const existeProductoNombre = async (nombre = '')=>{
    const exisProd = await Producto.findOne({nombre})
    if (exisProd){
        throw new Error (`El producto: ${nombre} ya existe en los registros`);

    }
}


module.exports = {esRoleValid, esEmailValid,esUserValid,existeCategoria,existeProducto,existeProductoNombre}