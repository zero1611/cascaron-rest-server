const express = require('express')
const cors = require('cors')
const {dbConection} = require("../database/config");
class Server{
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usersPath = '/api/user'
        this.authPath = '/api/auth'
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
    }
    routes(){
        this.app.use(this.authPath, require('../routes/auth'))

        this.app.use(this.usersPath, require('../routes/user'))

    }
    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto ', this.port)
        })
    }
}

module.exports = Server;