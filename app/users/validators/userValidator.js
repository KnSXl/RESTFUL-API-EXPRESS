const database = require('../database/userDatabase.json');

const userValidator = (data, params) => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    // Valida se existe as chaves
    if (!data) {
        errors.name = ['The name field is required'];
        errors.email = ['The email field is required'];
        errors.password = ['The password field is required'];

        // Retorna objeto de erros
        return {
            errors: {
                ...errors,
            }
        }
    }

    // Validação do nome
    if (!data.name) {
        errors.name = ['The name field is required'];
    } else if (data.name.length < 3) {
        errors.name = ['The name field must contain at least 3 characters'];
    }
    
    // Validação do email
    if (!data.email) {
        errors.email = ['The email field is required'];
    } else if (
        database.some(user =>
            user.email.toLowerCase() === data.email.toLowerCase() &&  // Verifica se o e-mail já existe
            user.id !== Number(params.id)  // Ignora quando é o próprio usuário
        )
    ) {
        errors.email = ['This email is already in use'];
    } else if (!emailRegex.test(data.email)) {
        errors.email = ['The email field must be a valid email address'];
    }
    
    // Validação da senha
    if (!data.password) {
        errors.password = ['The password field is required'];
    } else if (data.password.length < 8) {
        errors.password = ['The password field must contain at least 8 characters'];
    }

    // Retorna true se não houver erros
    if (Object.keys(errors).length == 0) {
        return true;
    }

    // Retorna objeto de erros
    return {
        errors: {
            ...errors,
        }
    }
};

module.exports = userValidator;
