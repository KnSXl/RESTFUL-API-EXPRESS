module.exports = (app) => {
    const controller = app.users.controllers.userController;

    app.route('/api/v1/users')
        .get(controller.listUsers)
        .post(controller.addUser);
    
    app.route('/api/v1/users/:id')
        .get(controller.getUser)
        .put(controller.editUser)
        .patch(controller.editUser)
        .delete(controller.deleteUser);
};