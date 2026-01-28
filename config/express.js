const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const consign = require('consign');
const cors = require('cors');

module.exports = () => {
    const app = express();

    app.use(cors());

    // Define porta da aplicação
    app.set('port', process.env.PORT || config.get('server.port'));

    // Middleware para JSON
    app.use(bodyParser.json());

    // Módulos da aplicação
    const modules = [
        'users',
    ];

    const loader = consign({ cwd: 'app' });  // Inicializa carregamento automático
    
    // Carrega database, controllers e routes
    modules.forEach(module => {
        loader
            .then(`/${module}/database`)
            .then(`/${module}/controllers`)
            .then(`/${module}/routes`);
    });

    loader.into(app);  // Injeta módulos no app

    return app;
};