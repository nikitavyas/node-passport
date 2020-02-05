var handler = require('./login.handler');
var auth = require('../auth');

module.exports = function (auth_router,knex) {
    auth_router.route('/login').post(handler().login);
}