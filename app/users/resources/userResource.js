const userResource = (data) => {
    // Formata um único usuário
    if (!Array.isArray(data)) {
        return {
            id: data.id,
            name: data.name,
            email: data.email,
            password: data.password,
        };
    }

    // Formata lista de usuários
    return {
        data: data.map(d => ({
            id: d.id,
            name: d.name,
            email: d.email,
            password: d.password,
        }))
    };
};

module.exports = userResource;