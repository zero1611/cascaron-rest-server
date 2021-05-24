const path = require("path");
const fs = require("fs");
const {Producto} = require("../models/indexx");
const {User} = require("../models/indexx");
const {subirArchivo} = require("../helpers/subir-archivo");
const {response} = require("express");

const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL)




    const cargarArchivo = async (req, res = response) =>{



        //texto
        try {
            const nombre = await subirArchivo(req.files, ['txt','md'], 'textos');
            res.json({
                nombre
            });
        }
        catch (e) {
            res.status(400).json({
                msg: e
            })
        }

    }
    const actualizarImagen =async (req, res = response) =>{

        const {id, coleccion} = req.params;

        let modelo;
        switch (coleccion) {
            case 'users':
                modelo = await User.findById(id);
                if(!modelo){
                    return res.status(400).json({
                        msg: `No existe un usuario con el id ${id}`
                    })
                }
            break;
            case 'productos':
                modelo = await Producto.findById(id);
                if(!modelo){
                    return res.status(400).json({
                        msg: `No existe un producto con el id ${id}`
                    })
                }
            break;
            default:
                return res.status(500).json({msg: 'Se me olvido validar esto'});
        }
        //Limpiar Imagenes Previas
        try {
            if(modelo.img){
                //borrar imagen del servidor
                const pathImagen = path.join(__dirname, '../uploads', coleccion,modelo.img);
                if(fs.existsSync(pathImagen)){
                    fs.unlinkSync(pathImagen);
                }
            }
        }catch (e) {
            res.json(e);
        }
        
        const nombre = await subirArchivo(req.files, undefined, coleccion);
        modelo.img = nombre;
        await modelo.save();

        res.json({
            modelo
        })

    }
    const mostrarImagen = async (req, res = response) =>{
        const {id, coleccion} = req.params;

        let modelo;
        switch (coleccion) {
            case 'users':
                modelo = await User.findById(id);
                if(!modelo){
                    return res.status(400).json({
                        msg: `No existe un usuario con el id ${id}`
                    })
                }
                break;
            case 'productos':
                modelo = await Producto.findById(id);
                if(!modelo){
                    return res.status(400).json({
                        msg: `No existe un producto con el id ${id}`
                    })
                }
                break;
            default:
                return res.status(500).json({msg: 'Se me olvido validar esto'});
        }
        //Limpiar Imagenes Previas
        try {
            if(modelo.img){
                //borrar imagen del servidor
                const pathImagen = path.join(__dirname, '../uploads', coleccion,modelo.img);
                if(fs.existsSync(pathImagen)){
                  return  res.sendFile(pathImagen);
                }
            }else if(!modelo.img) {
                const pathImagen = path.join(__dirname, '../assets/not-found-image.jpg');
                return res.status(404).sendFile(pathImagen);
            }
        }catch (e) {
            res.json(e);
        }

    }
    const actualizarIMGCloudinary =async (req, res = response) =>{

        const {id, coleccion} = req.params;

        let modelo;
        switch (coleccion) {
            case 'users':
                modelo = await User.findById(id);
                if(!modelo){
                    return res.status(400).json({
                        msg: `No existe un usuario con el id ${id}`
                    })
                }
                break;
            case 'productos':
                modelo = await Producto.findById(id);
                if(!modelo){
                    return res.status(400).json({
                        msg: `No existe un producto con el id ${id}`
                    })
                }
                break;
            default:
                return res.status(500).json({msg: 'Se me olvido validar esto'});
        }
        //Limpiar Imagenes Previas
        try {
            if(modelo.img){
                const  nombreArr = modelo.img.split('/');
                const nombre = nombreArr[nombreArr.length - 1];
                const[public_id] = nombre.split('.');
                await cloudinary.uploader.destroy(public_id);

            }

            const {tempFilePath} = req.files.archivo
            const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
            modelo.img = secure_url;
            await modelo.save()
            res.json({
                modelo
            })
        }catch (e) {
            res.json(e);
        }


        // modelo.img = nombre;
        // await modelo.save();



    }


    module.exports = {
        cargarArchivo,actualizarImagen,mostrarImagen,actualizarIMGCloudinary
    }