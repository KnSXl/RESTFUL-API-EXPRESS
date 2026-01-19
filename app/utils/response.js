/**
 * Padroniza respostas HTTP da API.
 * @param {Object} res - Response do Express
 * @param {Number} status - Código HTTP
 * @param {Boolean} success - Indica sucesso ou erro
 * @param {String} message - Mensagem da resposta
 * @param {Array|Object} data - Dados retornados (se sucesso)
 * @returns {Object} JSON da resposta
 */
const response = ({ res, status, success, message, data }) => {
    res.status(status).json({
        status,
        success,
        message,
        ...(success && { data }),
    });
};

module.exports = response;