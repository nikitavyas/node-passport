var handler = require('./refreshtoken.handler');
var auth = require('../auth');

module.exports = function (token_router) {
    token_router.route('/refreshtoken').post(handler().refreshtoken);
}