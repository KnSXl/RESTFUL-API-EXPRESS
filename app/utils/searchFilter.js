/**
 * @param {Array} data - [ { 'name': 'User 1', 'email': 'user1@email.com' }, { 'name': 'User 2', 'email': 'user2@email.com' } ]
 * @param {Object} query - { 'name': 'User 1' }
 * @param {Array} fields - [ 'name', 'email' ]
 * @returns - Array filtrado
 */
const searchFilter = (data, query, fields) => {
    return data.filter(d => {
        return Object
            .entries(query)
            .every(([key, value]) => {
                // ignora chaves fora da lista de campos permitidos
                if (!fields.includes(key)) {
                    return true;
                }

                // ignora filtros vazios ou não definidos
                if (value === '' || value === null || value === undefined) {
                    return true;
                }

                const valueData = d[key];  // valor do campo atual no item

                // reprova se o campo não existir no item
                if (valueData === undefined) {
                    return false;
                }

                // comparação flexível para strings (case-insensitive)
                if (typeof value === 'string') {
                    return valueData
                        .toString()
                        .toLowerCase()
                        .includes(value.toLowerCase());
                }

                // comparação direta para números e booleanos
                if (typeof value === 'number' || typeof value === 'boolean') {
                    return valueData === value;
                }

                return false;  // tipo de filtro não suportado
            });
    });
};

module.exports = searchFilter;