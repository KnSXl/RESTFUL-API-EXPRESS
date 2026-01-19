module.exports = (app) => {
    const controller = app.users.controllers.userController;

    // Rota para listagem e criação de usuários
    app.route('/api/v1/users')
        .get(controller.listUsers)
        .post(controller.addUser);
    
    // Rota para operações por ID
    app.route('/api/v1/users/:id')
        .get(controller.getUser)
        .put(controller.editUser)
        .patch(controller.editUser)
        .delete(controller.deleteUser);
};