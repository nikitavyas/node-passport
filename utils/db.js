var config = require('../app/knexfile');
var env = 'DEV';
//var env = 'LIVE';
var knex = require('knex')(config[env]);
module.exports = knex;
//knex.migrate.latest([config]);