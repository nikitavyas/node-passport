var handler = require('./validatetoken.handler');
var auth = require('../auth');

module.exports = function (api_router) {
    api_router.route('/validatetoken').post(handler().validatetoken);
}