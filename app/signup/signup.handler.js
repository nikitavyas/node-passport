var db = require('./signup.db')
module.exports = function (knex) {

    signup = function (req, res, next) {
        db(knex).signup(req).then(function (result) {
            res.status(200).json(result);
        }).catch(function (err) {
            next(err);
        });
    }

    return this;
}