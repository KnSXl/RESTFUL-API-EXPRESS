const fs = require('fs');
const path = require('path');

// Salva dados no arquivo JSON
const save = (data) => {
    const database = '../database/userDatabase.json';
    const filePath = path.join(__dirname, database);

    // Escreve no arquivo
    fs.writeFileSync(
        filePath,
        JSON.stringify(data, null, 4),
        'utf8'
    );
};

module.exports = save;