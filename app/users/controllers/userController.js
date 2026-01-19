const save = require('../models/userModel.js');
const response = require('../../utils/response.js');
const userResource = require('../resources/userResource.js');
const userValidator = require('../validators/userValidator.js')

module.exports = (app) => {
    const usersDB = app.users.database.userDatabase;
    const controller = {};

    controller.listUsers = (req, res) => {
        res.status(200).json(userResource(usersDB));
    };

    controller.getUser = (req, res) => {
        const { id } = req.params;

        const user = usersDB.find(user => user.id == id);

        if (!user) {
            return response({ res, status: 404, success: false, message: 'User not found' });
        }
        
        response({ res, status: 200, success: true, message: 'User successfully found', data: userResource(user) });
    };

    controller.addUser = (req, res) => {
        const validation = userValidator(req.body);

        if (validation !== true) {
            return res.status(422).json(validation);
        }

        const newUser = {
            id: usersDB[usersDB.length - 1]?.id + 1,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };

        usersDB.push(newUser);

        save(usersDB);

        response({ res, status: 201, success: true, message: 'User created successfully', data: newUser });
    };

    controller.editUser = (req, res) => {
        const { id } = req.params;

        const user = usersDB.find(user => user.id == id);

        if (!user) {
            return response({ res, status: 404, success: false, message: 'User not found' });
        }

        const validation = userValidator(req.body);

        if (validation !== true) {
            return res.status(422).json(validation);
        }

        save(usersDB);

        response({ res, status: 200, success: true, message: 'User edited successfully', data: userResource(user) });
    };

    controller.deleteUser = (req, res) => {
        const { id } = req.params;

        const user = usersDB.find(user => user.id == id);
        const userIndex = usersDB.findIndex(user => user.id == id);

        if (!user) {
            response({ res, status: 404, success: false, message: 'User not found' });
        } else {
            usersDB.splice(userIndex, 1);
            
            save(usersDB);

            response({ res, status: 200, success: true, message: 'User deleted successfully', data: userResource(user) });
        }
    };

    return controller;
};