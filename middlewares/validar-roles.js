    const {response} = require("express");

    const esAdminRole =(req, res = response,next)=>{
        if(!req.user){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el toquen primero'
            });
        }

        const {rol, nombre} = req.user;
        if (rol !== 'ADMIN_ROLE'){
            return res.status(401).json({
                msg: `${nombre} no presenta rol de administrador: -Rol:${rol}`
            });
        }
        next();
    }

    const tieneRole = (...roles) =>{
        return(req, res = response,next)=>{
            if(!req.user){
                return res.status(500).json({
                    msg: 'Se quiere verificar el rol sin validar el toquen primero'
                });
            }
            if(!roles.includes(req.user.rol)){
                return res.status(401).json({
                    msg: `Servicio necesita uno de los siguientes -Roles Permitidos:${roles}`
                });
            }
            next()
        }
    }

    module.exports ={
    esAdminRole,tieneRole
    }