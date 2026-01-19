const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const consign = require('consign');

module.exports = () => {
    const app = express();

    // SETANDO VARIÁVEIS DA APLICAÇÃO
    app.set('port', process.env.PORT || config.get('server.port'));

    // MIDDLEWARES
    app.use(bodyParser.json());

    // ENDPOINTS
    const modules = [
        'users',
    ];

    const loader = consign({ cwd: 'app' });
    
    modules.forEach(module => {
        loader
            .then(`/${module}/database`)
            .then(`/${module}/controllers`)
            .then(`/${module}/routes`);
    });

    loader.into(app);

    return app;
};