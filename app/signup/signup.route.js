var handler = require('./signup.handler');

module.exports = function (app, knex) {
    app.post('/signup', handler(knex).signup);
}