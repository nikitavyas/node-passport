var db = require('./users.db')
module.exports = function (knex) {

    updateuser = function (req, res, next) {
        db(knex).updateuser(req).then(function (result) {
            res.status(200).json(result);
        }).catch(function (err) {
            next(err);
        });
    }

    changeuserstatus = function (req, res, next) {
        db(knex).changeuserstatus(req).then(function (result) {
            res.status(200).json(result);
        }).catch(function (err) {
            next(err);
        });
    }

    deleteuser = function (req, res, next) {
        db(knex).deleteuser(req).then(function (result) {
            res.status(200).json(result);
        }).catch(function (err) {
            next(err);
        });
    }

    return this;
}