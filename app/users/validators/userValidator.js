const userValidator = (data) => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!data.name) {
        errors.name = ['The name field is required'];
    } else if (data.name.length < 3) {
        errors.name = ['The name field must contain at least 3 characters'];
    }
    
    if (!data.email) {
        errors.email = ['The email field is required'];
    } else if (!emailRegex.test(data.email)) {
        errors.email = ['The email field must be a valid email address'];
    }
    
    if (!data.password) {
        errors.password = ['The password field is required'];
    } else if (data.password.length < 8) {
        errors.password = ['The password field must contain at least 8 characters'];
    }

    if (Object.keys(errors).length == 0) {
        return true;
    }

    return {
        errors: {
            ...errors,
        }
    }
};

module.exports = userValidator;