const {userGet,userPost,userPut,userDelete,userPatch} = require("../controllers/user");
const {Router} = require('express');
const router = Router();

router.get('/',  userGet);

router.put('/:id', userPut );
router.post('/',  userPost)
router.delete('/',  userDelete)
router.patch('/', userPatch)
module.exports = router;