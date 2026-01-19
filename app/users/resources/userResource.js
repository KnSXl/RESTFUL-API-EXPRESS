const userResource = (data) => {
    if (!Array.isArray(data)) {
        return {
            id: data.id,
            name: data.name,
            email: data.email,
            password: data.password,
        };
    }

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