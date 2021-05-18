    const {response} = require("express");
    const User = require('../models/user')
    const bcryptjs = require("bcryptjs");
    const {generarJWT} = require("../helpers/generarJWT.");
    const login = async (req, res = response) =>{
        const {correo, password} = req.body;

        try {
            //Verificar si el email existe
            const user = await User.findOne({correo})
            if(!user){
                return res.status(400).json({
                    msg: 'Usuario / Password no son correctos - correo'
                });
            }
            //Si el usuario esta activo

            if(!user.estado){
                return res.status(400).json({
                    msg: 'Usuario ingresado no Existe '
                });
            }
            //Verificar la contraseña
            const validPassword = bcryptjs.compareSync(password, user.password);
            if(!validPassword){
                return res.status(400).json({
                    msg: 'Usuario / Password no son correctos - correo'
                })
            }
            //
            const token = await generarJWT(user.id);
            const uid = user.id
            res.json({
                user,
                token,

            })
        }catch (e) {
            console.log(e)
              res.status(500).json({

                msg: 'Algo salio mal reintentelo mas tarde'
            });
        }

    }
    module.exports = {
        login
    }