var db = require('./login.db')
var auth = require('../auth');

module.exports = function (knex) {
	//function to validate login credentials	
	login = function (req, res, next) {
		process.nextTick(function () {
			auth.authenticate(req, res).then(function (result) {
				//send result as response
				res.status(200).json(result);
			}).catch(function (err) {
				//send error as response
				next(err);
			});
		});
	}

	return this;
}