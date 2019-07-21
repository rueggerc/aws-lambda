

module.exports.buildResponse = function(text,statusCode = 200) {
    let response = {
        statusCode: statusCode,
        headers: {"Content-Type": 'application/json'},
        body: text
    };
    return response;
};

module.exports.formatSuccessText = function(text) {
    let responseMessage = {
        "helloMsg:": text,
    }
    return JSON.stringify(responseMessage);
};

module.exports.formatErrorText = function(text) {
    let formattedText = `{error: ${text}}`;
    return formattedText;
};