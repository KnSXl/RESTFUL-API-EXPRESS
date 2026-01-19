/**
 * Padroniza respostas da aplicação
 * @param {Object} res - ...
 * @param {Number} status - Número do status
 * @param {Boolean} success - indica sucesso ou falha
 * @param {String} message - mensagem descritiva
 * @param {Array | Object} data - dados retornados em caso de sucesso
 * @returns {Object} - objeto de resposta formatado
 */
const response = ({ res, status, success, message, data }) => {
    res.status(status).json({
        status: status,
        success: success,
        message: message,
        ...(success && { data }),
    });
};

module.exports = response;