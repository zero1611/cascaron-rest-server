const {response} = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs')


const userGet = async (req, res = response)=> {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true}
    if(isNaN(Number(limite)) || isNaN(Number(desde))) {
        res.json({
            msg: `Limites de Paginacion deben ser numericos, limite ingresado: ${limite}, desde ingresado:${desde}  `
        });
    }
    else{

        const resp = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])
        res.json({
            'Totla Registros': resp[0],
            'Limite': limite,
            'Desde': desde,
            'Users':resp[1]
        });
    }

}
const userPut =async (req, res)=> {
    const id = req.params.id
    const {_id,password, google,correo, ...resto} = req.body
    // validar conta bd
    if(password){
        //encriptacion
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }
    const user = await User.findByIdAndUpdate(id,resto)

    res.json(user);
}
const userPost = async (req, res)=> {

    const {nombre, correo, password, rol} = req.body;
    const user = new User({nombre, correo, password, rol});
    //encriptacion
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //guardar bd
    await user.save();
    res.json({
        msg: 'post API - controlador',
        user
    });
}
const userPatch = (req, res)=> {
    res.json({
        msg: 'patch API - controlador'
    });
}
const userDelete = async (req, res)=> {
    const {id} = req.params;

    // const user = await User.findByIdAndDelete(id);
    const user = await User.findByIdAndUpdate(id,{estado: false})

    res.json(user);
}
module.exports = {
    userGet,userPut,userPost,userPatch,userDelete
}