    const {response} = require("express");
    const User = require('../models/user')
    const bcryptjs = require("bcryptjs");
    const {googleVerify} = require("../helpers/google-verify");
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
    const googleSignin = async (req, res = response) =>{

        try {
            const {id_token} = req.body;
            const {correo, nombre, img} = await googleVerify(id_token);

            let user = await User.findOne({correo});
            if(!user ){
                const data = {
                    nombre,
                    correo,
                    password: ':P',
                    img,
                    google: true
                };
                user = new User(data);
                await user.save()
            }
            if(!user.estado){
                return res.status(401).json({
                    msg: 'Comuniquese con el administrador, usuario bloqueado'
                })
            }

            const token = await generarJWT(user.id);
            res.json({
                user,
                token
            })
        }catch (e) {
            res.status(400).json({
                msg: 'Token de Google no es valido'
            });
        }

    }
    module.exports = {
        login,googleSignin
    }