/*!
 * TokenManager
 *
 * Copyright (c) 2015-2016 Intellimedianetworks
 */

/**
 * Module dependencies.
 */

var Promise = require('bluebird');
var redisClient = require("../../utils/redis").redis;
var uid = require('../../utils/uid').uid;
var _ = require("lodash");
var _Error = require('../../errors/errors');
var Constant = require('../../constants/constant');

module.exports = {

    /**
    * Genrate RefreshToken 
    *
    * @param {String} token
    * @return {Function} reject,resolve
    * @api private
    */
    addRefreshToken: function (token, knex) {

        return new Promise(function (resolve, reject) {
            var refreshToken = uid.getuid(14);
            /*knex.raw(Constant.Call.StoreProcedure+
                Constant.Procedure.AddRefreshToken
                + Constant.DBParameter.Token + "='" + token + "',"
                + Constant.DBParameter.RefreshToken + "='" + refreshToken+"'").then(function (results) {
                    resolve(refreshToken);
                }).catch(function (err) {
                    reject(new _Error.BadRequestError(Constant.APIErrorCode.StatusInvalidRequest, { message: Constant.APIErrorText(Constant.APIErrorCode.StatusInvalidRequest)}));
                })*/
            redisClient.set(refreshToken, token, function (error, result) {
                if (_.isEmpty(error)) {
                    resolve(refreshToken);
                } else {
                    reject(new _Error.BadRequestError(1406, { message: error.message }));
                }
            });
        });
    },

    /**
    * Verify RefreshToken 
    *
    * @param {String} token
    * @param {String} refreshToken
    * @return {Function} reject,resolve
    * @api private
    */
    verifyRefreshToken: function (refreshToken, token, knex) {
		return new Promise(function (resolve, reject) {
            knex.raw(Constant.Call.StoreProcedure+
                Constant.Procedure.ValidateRefreshToken
                + Constant.DBParameter.Token + "='" + token + "',"
                + Constant.DBParameter.RefreshToken + "='" + refreshToken+"'").then(function (results) {
					if(results[0].bActive == 1){
                        resolve(true);
                    } else {
                       reject(new _Error.BadRequestError(Constant.APIErrorCode.StatusRefreshTokenInvalidOrExpired, { message: Constant.APIErrorText(Constant.APIErrorCode.StatusRefreshTokenInvalidOrExpired)})); 
                    }
                }).catch(function (err) {
                    reject(new _Error.BadRequestError(Constant.APIErrorCode.StatusInvalidRequest, { message: Constant.APIErrorText(Constant.APIErrorCode.StatusInvalidRequest)}));
                })
            /*redisClient.get(refreshToken, function (err, result) {
                if (!err) {
                    if (_.isEmpty(result)) {
                        reject(new _Error.NotFoundError(1404, { message: "RefreshTokenNotFound" }));
                    }
                    else {
                        if (_.eq(result, token)) {
                            redisClient.del(refreshToken, function (error, result) { });
                            resolve(true);
                        }
                        else {
                            reject(new _Error.NotFoundError(1405, { message: "Invalid_Token" }));
                        }
                    }
                } else {
                    reject(new _Error.BadRequestError(1406, { message: err.message }));
                }
            });*/
        });
    }

}
