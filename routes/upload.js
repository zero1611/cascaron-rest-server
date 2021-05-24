const {actualizarIMGCloudinary} = require("../controllers/upload");
const {mostrarImagen} = require("../controllers/upload");
const {validarArchivoSubir} = require("../middlewares/validarArchivo");
const {coleccionesPermitidas} = require("../helpers/db-validators");
    const {actualizarImagen} = require("../controllers/upload");
    const {cargarArchivo} = require("../controllers/upload");
    const {validarCampos} = require("../middlewares/validar-campos");
    const {Router} = require('express');
    const {check} = require("express-validator");

    const router = Router();

    router.post('/', validarArchivoSubir,cargarArchivo)
    router.put('/:coleccion/:id',[
        validarArchivoSubir,
        check('id', 'El id debe ser un id valido de mongo').isMongoId(),
        check('coleccion').custom(c => coleccionesPermitidas(c, ['users', 'productos'])),
        validarCampos
    ],actualizarIMGCloudinary)


    router.get('/:coleccion/:id', [
        check('id', 'El id debe ser un id valido de mongo').isMongoId(),
        check('coleccion').custom(c => coleccionesPermitidas(c, ['users', 'productos'])),
        validarCampos
    ], mostrarImagen)

    module.exports = router;