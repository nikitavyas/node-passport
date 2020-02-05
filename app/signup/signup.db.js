var Promise = require("bluebird");
var Constant = require('../../constants/constant');
var crypto = require('../../utils/crypto');
var config = require('../../config');
var _Error = require('../../errors/errors');

module.exports = function (knex) {
    signup = function (req) {
        return new Promise(function (resolve, reject) {
            //encrypting password
            var encryptedText = crypto.encrypt(req.body.password, crypto.CHIPERS.AES_128, crypto.ENCODING.BASE64);

            knex.raw(Constant.Call.StoreProcedure+
                Constant.Procedure.UserSignup +"('" + req.body.firstname + "', '" + 
                req.body.lastname + "', '" + 
                req.body.useremail + "', '" + 
                encryptedText + "', '" + 
                req.body.mobileno + "', '" + 
                req.body.address + "');").then(function (results) {
                    if (results != undefined && results.length != "0") {
                        Constant.APIResponse.code = Constant.HttpStatusCode.StatusOK;
                        Constant.APIResponse.data = results[0][0][0];
                        Constant.APIResponse.description = Constant.HttpStatusText(Constant.HttpStatusCode.StatusOK);
                        resolve(Constant.APIResponse);
                    }
                    else {
                        Constant.APIResponse.code = Constant.HttpStatusCode.StatusUnauthorized;
                        Constant.APIResponse.data = Constant.HttpStatusText(Constant.HttpStatusCode.StatusUnauthorized);
                        Constant.APIResponse.description = Constant.APIErrorText(Constant.APIErrorCode.StatusInvalidCredentails);
                        resolve(Constant.APIResponse);
                    }

                }).catch(function (err) {
                    reject(new _Error.BadRequestError(Constant.APIErrorCode.StatusInvalidRequest, { message: Constant.APIErrorText(Constant.APIErrorCode.StatusInvalidRequest) }));
                });
        });
    }
    return this;
}