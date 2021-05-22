    const {response} = require("express");
    const {ObjectId} = require('mongoose').Types;
    const {User, Categoria, Producto} = require('../models/indexx')
    const coleccionesPerimitidas = [
        'users',
        'categorias',
        'productos',
        'roles'
    ];

    const buscarUsers = async (termino = '',res = response)=>{
        const esMongoId = ObjectId.isValid(termino);
        if(esMongoId){
             const user = await User.findById(termino);
             return  res.json({
                 results: (user)?[user]:[]
             });

        }
        const regex = new RegExp(termino, 'i')
        const users  = await User.find({
           $or: [{nombre: regex}, {correo: regex}],
            $and:[{estado: true}]

        });
        res.json({
            results: users
        });
    }
    const buscarCategotias = async (termino = '',res = response)=>{
        const esMongoId = ObjectId.isValid(termino);
        if(esMongoId){
            const categoria = await Categoria.findById(termino);
            return  res.json({
                results: (categoria)?[categoria]:[]
            });

        }
        const regex = new RegExp(termino, 'i')
        const categoria  = await Categoria.find({
             nombre: regex,
             estado: true

        });
        res.json({
            results: categoria
        });
    }
    const buscarProductos = async (termino = '',res = response)=>{
        const esMongoId = ObjectId.isValid(termino);
        if(esMongoId){
            const producto = await Producto.findById( termino ).populate('categoria', 'nombre');
            if(producto){
                return res.json({
                    results: (producto) ? [producto] : []
                })
            }

            const productos = await Producto.find({categoria:termino})
            return res.json({
                results: (productos) ? [productos] : []
            })
        }
        const regex = new RegExp(termino, 'i')
        const producto  = await Producto.find({
            nombre: regex
            ,estado: true

        }).populate('categoria','nombre');
        res.json({
            results: producto
        });
    }



    const buscar = (req, res = response )=>{
        const {coleccion, termino} = req.params;

        if(!coleccionesPerimitidas.includes(coleccion)){
            return res.status(400).json({
                msg: `Las colecciones permitidas son: ${coleccionesPerimitidas}`
            });
        }
        switch (coleccion){
            case'users':
                buscarUsers(termino, res)
            break;
            case'categorias':
                buscarCategotias(termino,res)
            break;
            case'productos':
                buscarProductos(termino,res)
            break;
            default:
                res.status(500).json({
                    msg: 'Busqueda no definida'
                })
        }

    }

 module.exports = {buscar}