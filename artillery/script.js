const faker = require('faker');

function populateMessage(requestParams, context, ee, next) {
    requestParams.json = {
        message: faker.random.word(),
    }
    return next();
}

module.exports = {
    populateMessage: populateMessage,
}