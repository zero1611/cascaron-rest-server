const validaRoles = require("../middlewares/validar-roles");
const validarJwt = require("../middlewares/validar-jwt");
const validarCampos = require("../middlewares/validar-campos");
const validarArchivoSubir = require('../middlewares/validarArchivo')

module.exports =  {
    ...validaRoles,
    ...validarCampos,
    ...validarJwt,
    ...validarArchivoSubir
}