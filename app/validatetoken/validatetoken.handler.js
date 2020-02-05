var auth = require('../auth');

module.exports = function () {
   
    validatetoken = function (req, res, next) {
        process.nextTick(function () {
            auth.validatetoken(req, res).then(function (result) {
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