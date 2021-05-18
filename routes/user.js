
const {
    esAdminRole,tieneRole,validarJwt,validarCampos
} = require('../middlewares/indexx')
const {esRoleValid, esEmailValid,esUserValid}= require("../helpers/db-validators");
const {check} = require("express-validator");

const {userGet,userPost,userPut,userDelete,userPatch} = require("../controllers/user");
const {Router} = require('express');
const router = Router();

router.get('/',  userGet);

router.put('/:id',[
    check('id', 'No es un ID de Usuario Valido').isMongoId(),
    check('id').custom(esUserValid),
    check('rol').custom(esRoleValid),
    validarCampos
], userPut );
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe ser  de 6 letras o mas').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(esEmailValid),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValid),
    validarCampos
], userPost)
router.delete('/:id',[
    validarJwt,
    // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID de Usuario Valido').isMongoId(),
    check('id').custom(esUserValid),
    validarCampos
],  userDelete)
router.patch('/', userPatch)
module.exports = router;