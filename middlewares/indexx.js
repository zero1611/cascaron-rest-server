const validaRoles = require("../middlewares/validar-roles");
const validarJwt = require("../middlewares/validar-jwt");
const validarCampos = require("../middlewares/validar-campos");

module.exports =  {
    ...validaRoles,
    ...validarCampos,
    ...validarJwt,
}