const {tieneRole} = require("../middlewares/validar-roles");
const {CatDelete} = require("../controllers/categorias");
const {catPut} = require("../controllers/categorias");
const {categoriaBusGet} = require("../controllers/categorias");
const {existeCategoria} = require("../helpers/db-validators");
const {crearCategoria,categoriaGet} = require("../controllers/categorias");
const {validarJwt} = require("../middlewares/validar-jwt");
const {validarCampos} = require("../middlewares/validar-campos");
const {Router} = require('express');
const {check} = require("express-validator");

const router = Router();
//Todas las categorias
router.get('/',  categoriaGet);
// Obtener una categoria - publico -

router.get('/:id',[
    check('id', 'No es un ID de Categoria Valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],categoriaBusGet)

// Crear categoria- privado- cualquier persona con token valido
router.post('/',[
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria)

// Actualizar -privado - cualquiera con token valido
router.put('/:id',[
    validarJwt,
    check('id', 'No es un ID de Categoria Valido').isMongoId(),
    check('id').custom(existeCategoria),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], catPut );

// Borrar una categoria - admin
router.delete('/:id',[
    validarJwt,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID de Categoria Valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],  CatDelete)


module.exports = router;