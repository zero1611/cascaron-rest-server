const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload');
const {dbConection} = require("../database/config");
class Server{
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            users: '/api/user',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar: '/api/buscar',
            uploads: '/api/uploads'
        };

         //conectar database
        this.conectarDB()
        //midlewares
        this.middlewares()
        // Rutas de la app
        this.routes()

    }
    async conectarDB(){
        await dbConection();
    }
    middlewares(){
        // Directorio Publico
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
        //Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }
    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));

        this.app.use(this.paths.users, require('../routes/user'));

        this.app.use(this.paths.categorias, require('../routes/categorias'));

        this.app.use(this.paths.productos, require('../routes/productos'));

        this.app.use(this.paths.buscar, require('../routes/bsucar'));

        this.app.use(this.paths.uploads, require('../routes/upload'))

    }
    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto ', this.port)
        })
    }
}

module.exports = Server;