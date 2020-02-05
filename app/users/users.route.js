var handler = require('./users.handler');
var auth = require('../auth');

module.exports = function (api_router, knex) {
    //route for updating user data
    api_router.route('/updateuser').post(handler(knex).updateuser);

    //route for changing user status
    api_router.route('/changeuserstatus').post(handler(knex).changeuserstatus);

    //route for deleting user
    api_router.route('/deleteuser/:id').delete(handler(knex).deleteuser);
}