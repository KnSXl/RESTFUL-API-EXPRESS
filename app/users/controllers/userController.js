const save = require('../models/userModel.js');  // Persiste dados no banco
const response = require('../../utils/response.js');  // Padroniza respostas da API
const userResource = require('../resources/userResource.js');  // Formata dados do usuário
const userValidator = require('../validators/userValidator.js');  // Valida dados de entrada
const searchFilter = require('../../utils/searchFilter.js');  // Filtro de pesquisa

module.exports = (app) => {
    const usersDB = app.users.database.userDatabase;  // Base de dados em memória
    const controller = {};  // Controller de usuários

    // Lista todos os usuários
    controller.listUsers = (req, res) => {
        const query = req.query;  // Filtros da query

        const fields = ['name', 'email'];  // Campos permitidos para filtrar

        const filteredUsers = searchFilter(usersDB, query, fields);  // Array filtrado

        res.status(200).json(userResource(filteredUsers));
    };

    // Busca usuário por ID
    controller.getUser = (req, res) => {
        const { id } = req.params;  // ID da rota

        const user = usersDB.find(user => user.id == id);  // Localiza usuário

        // Usuário não encontrado
        if (!user) {
            return response({ res, status: 404, success: false, message: 'User not found' });
        }
        
        // Retorna usuário
        response({ res, status: 200, success: true, message: 'User successfully found', data: userResource(user) });
    };

    // Cria novo usuário
    controller.addUser = (req, res) => {
        const validation = userValidator(req.body);  // Valida dados

        // Erro de validação
        if (validation !== true) {
            return res.status(422).json(validation);
        }

        // Monta novo usuário
        const newUser = {
            id: usersDB[usersDB.length - 1]?.id + 1 || 1,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };

        usersDB.push(newUser);  // Adiciona ao banco

        save(usersDB);  // Salva alterações

        // Retorna sucesso
        response({ res, status: 201, success: true, message: 'User created successfully', data: newUser });
    };

    // Edita usuário existente
    controller.editUser = (req, res) => {
        const { id } = req.params;  // ID da rota

        const user = usersDB.find(user => user.id == id);  // Localiza usuário
        const userIndex = usersDB.findIndex(user => user.id == id);  // Índice no array

        // Usuário não encontrado
        if (!user) {
            return response({ res, status: 404, success: false, message: 'User not found' });
        }

        const validation = userValidator(req.body, req.params);  // Valida dados

        // Erro de validação
        if (validation !== true) {
            return res.status(422).json(validation);
        }

        // Atualiza os campos
        usersDB[userIndex] = {
            ...usersDB[userIndex],
            name: req.body.name ?? usersDB[userIndex].name,
            email: req.body.email ?? usersDB[userIndex].email,
            password: req.body.password ?? usersDB[userIndex].password,
        }

        save(usersDB);  // Salva alterações

        // Retorna sucesso
        response({ res, status: 200, success: true, message: 'User edited successfully', data: userResource(usersDB[userIndex]) });
    };

    // Remove usuário
    controller.deleteUser = (req, res) => {
        const { id } = req.params;  // ID da rota

        const user = usersDB.find(user => user.id == id);  // Localiza usuário
        const userIndex = usersDB.findIndex(user => user.id == id);  // Índice no array

        // Usuário não encontrado
        if (!user) {
            response({ res, status: 404, success: false, message: 'User not found' });
        } else {
            usersDB.splice(userIndex, 1);  // Remove do banco
            
            save(usersDB);  // Salva alterações

            // Retorna sucesso
            response({ res, status: 200, success: true, message: 'User deleted successfully', data: userResource(user) });
        }
    };

    return controller;
};