    const jwt = require('jsonwebtoken')
    const {response} = require("express");
    const User = require('../models/user')
    const validarJwt = async (req, res = response, next)=>{
        const token = req.header('x-token');
        if(!token){
            return res.status(401).json({
                msg: 'No hay token en la peticion'
            })
        }
        try {
            const {uid} = jwt.verify(token,process.env.SECRECTORPRIVATEKEY);
            // leer el usuario que corresponde al uid
            const user =  await User.findById(uid);

            if(!user){
                return res.status(401).json({
                    msg: 'Token no valido - User no existe DB'
                })
            }

            //verificar si el uid tiene estado en true
            if(!user.estado){
                return res.status(401).json({
                    msg: 'Token no valido - User estado False'
                })
            }
            req.user = user;
            next();
        }catch (e) {
            console.log(e);
            res.status(401).json({
                msg: 'Token no valido'
            })
        }
       
    }
    module.exports = {
    validarJwt
    }