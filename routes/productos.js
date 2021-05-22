const {ProdDelete} = require("../controllers/productos");
const {prodPut} = require("../controllers/productos");
const {existeProductoNombre} = require("../helpers/db-validators");
const {crearProducto} = require("../controllers/productos");
const {productosGet} = require("../controllers/productos");
const {productoBusGet} = require("../controllers/productos");
const {tieneRole} = require("../middlewares/validar-roles");
const {existeCategoria,existeProducto} = require("../helpers/db-validators");
const {validarJwt} = require("../middlewares/validar-jwt");
const {validarCampos} = require("../middlewares/validar-campos");
const {Router} = require('express');
const {check} = require("express-validator");

const router = Router();
//Todas las productos
router.get('/', productosGet);
// Obtener un producto - publico -

router.get('/:id',[
    check('id', 'No es un ID de Producto Valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],productoBusGet)

// Crear producto- privado- cualquier persona con token valido
router.post('/',[
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existeProductoNombre),
    check('categoria').custom(existeCategoria),
    validarCampos
],crearProducto)

// Actualizar -privado - cualquiera con token valido
router.put('/:id',[
    validarJwt,
    check('id', 'No es un ID de Categoria Valido').isMongoId(),
    check('id').custom(existeProducto),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], prodPut );
//
// // Borrar una categoria - admin
router.delete('/:id',[
    validarJwt,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID de Categoria Valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],  ProdDelete)


module.exports = router;