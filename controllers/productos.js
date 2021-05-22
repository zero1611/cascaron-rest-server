const {response} = require("express");
const {Producto} = require('../models/indexx');


//obtener categorias - paginado - total - populate(user)
const productosGet = async (req, res = response)=> {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true}
    if(isNaN(Number(limite)) || isNaN(Number(desde))) {
        res.json({
            msg: `Limites de Paginacion deben ser numericos, limite ingresado: ${limite}, desde ingresado:${desde}  `
        });
    }
    else{

        const resp = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('user', {nombre:1,correo:2})
                .populate('categoria',{nombre:1})
        ])

        res.json({
            'Totla Registros': resp[0],
            'Limite': limite,
            'Desde': desde,
            'Productos':resp[1]
        });
    }

}
//obtener Categoria - populate
const productoBusGet = async (req, res = response)=> {
    const {id} = req.params
    const producto = await Producto.findById(id).populate('user', {nombre:1,correo:2}).populate('categoria',{nombre:1});

    res.json(producto);
}



const crearProducto = async (req, res = response) =>{
    const nombre = req.body.nombre.toUpperCase();
    const productoDB = await Producto.findOne({nombre});
    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        });
    }
    // Generar la data a guardar
    try {

        const {nombre,user,precio,categoria,descripcion} = {
            nombre: req.body,
            user: req.user._id,
            precio: req.body,
            categoria: req.body,
            descripcion: req.body,
        }


        const  producto = await new Producto(nombre,user,precio,categoria,descripcion);
        producto.user = user;
        //guarda db
        await producto.save();

        res.status(201).json(producto);
    }catch (e) {
        console.log(e)
        res.status(500).json('Error al generar Producto');
    }
}

//Actyalizar Categoria
const prodPut =async (req, res)=> {
    const id = req.params.id
    const {_id, user, categoria, estado ,...resto} = req.body
    // validar contra bd

    const producto = await Producto.findByIdAndUpdate(id,resto,{new: true})

    res.json(producto);
}
//
//
// //Borrar Producto - estdado false
const ProdDelete = async (req, res)=> {
    const {id} = req.params;

    const producto = await Producto.findByIdAndUpdate(id,{estado: false},{new: true})

    res.json(producto);
}



module.exports ={
    crearProducto,productosGet,productoBusGet,prodPut,ProdDelete
}