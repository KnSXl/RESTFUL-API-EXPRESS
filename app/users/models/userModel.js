const fs = require('fs');
const path = require('path');

const save = (data) => {
    const database = '../database/userDatabase.json'
    const filePath = path.join(__dirname, database);

    fs.writeFileSync(
        filePath,
        JSON.stringify(data, null, 4),
        'utf8'
    );
};

module.exports = save;