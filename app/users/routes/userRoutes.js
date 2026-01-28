module.exports = (app) => {
    const controller = app.users.controllers.userController;
    const upload = require('../../middlewares/multer.js');

    // Rota para listagem e criação de usuários
    app.route('/api/v1/users')
        .get(controller.listUsers)
        .post(upload.none(), controller.addUser);
    
    // Rota para operações por ID
    app.route('/api/v1/users/:id')
        .get(controller.getUser)
        .put(upload.none(), controller.editUser)
        .patch(upload.none(), controller.editUser)
        .delete(controller.deleteUser);
};