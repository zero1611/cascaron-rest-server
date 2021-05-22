    const {response} = require("express");
    const {Categoria} = require('../models/indexx');


    //obtener categorias - paginado - total - populate(user)
    const categoriaGet = async (req, res = response)=> {

        const {limite = 5, desde = 0} = req.query;
        const query = {estado: true}
        if(isNaN(Number(limite)) || isNaN(Number(desde))) {
            res.json({
                msg: `Limites de Paginacion deben ser numericos, limite ingresado: ${limite}, desde ingresado:${desde}  `
            });
        }
        else{

            const resp = await Promise.all([
                Categoria.countDocuments(query),
                Categoria.find(query)
                    .skip(Number(desde))
                    .limit(Number(limite))
                    .populate('user', {nombre:1,correo:2})
            ])

            res.json({
                'Totla Registros': resp[0],
                'Limite': limite,
                'Desde': desde,
                'Categorias':resp[1]
            });
        }

    }
    //obtener Categoria - populate
    const categoriaBusGet = async (req, res = response)=> {
        const {id} = req.params
        const categoria = await Categoria.findById(id).populate('user', {nombre:1,correo:2});

        res.json(categoria);


    }



    const crearCategoria = async (req, res = response) =>{
        const nombre = req.body.nombre.toUpperCase();
        const categoriaDB = await Categoria.findOne({nombre});
        if(categoriaDB){
            return res.status(400).json({
                msg: `La categoria ${categoriaDB.nombre}, ya existe`
            });
        }
        // Generar la data a guardar
        try {
            const data = {
                nombre,
                user: req.user._id
            }
            const  categoria = await new Categoria(data);

            //guarda db
            await categoria.save();

            res.status(201).json(categoria);
        }catch (e) {
            res.status(500).json('Error al generar Categoria');
        }
    }

    //Actyalizar Categoria
    const catPut =async (req, res)=> {
        const id = req.params.id
        const {_id, user, estado ,...resto} = req.body
        // validar conta bd
        resto.nombre = resto.nombre.toUpperCase()

        const categoria = await Categoria.findByIdAndUpdate(id,resto,{new: true})

        res.json(categoria);
    }


    //Borrar Categoria - estdado false
    const CatDelete = async (req, res)=> {
        const {id} = req.params;


        // const user = await User.findByIdAndDelete(id);
        const categoria = await Categoria.findByIdAndUpdate(id,{estado: false},{new: true})

        res.json(categoria);
    }



    module.exports ={
        crearCategoria,categoriaGet,categoriaBusGet,catPut,CatDelete
    }