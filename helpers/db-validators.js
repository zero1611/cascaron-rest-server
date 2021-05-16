const Role = require('../models/role');
const User = require('../models/user')
const esRoleValid = async (rol ='') =>{
    const  existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
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
        throw new Error (`El id: ${id} no existe en los registros`)
    }
}
module.exports = {esRoleValid, esEmailValid,esUserValid}