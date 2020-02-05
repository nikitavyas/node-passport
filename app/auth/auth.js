/*load all necessary node and custom modules*/
var passport = require('passport')
var BasicStrategy = require('passport-http').BasicStrategy
var BearerStrategy = require('passport-http-bearer').Strategy
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');
var config = require('../../config');
var knex = require('../../utils/db');
var crypto = require('../../utils/crypto');
var _Error = require('../../errors/errors');
var Constant = require('../../constants/constant');
var tokenmanager = require('../tokenmanager');
var TokenStrategy = require('./tokenstrategy');
var _ = require("lodash");

//validate credentials with DB
passport.use(new BasicStrategy({ passReqToCallback: true },
    function (req, username, password, done) {
        if (!_.isEmpty(password) && !_.isEmpty(username)) {
            //encrypting password
            var encryptedText = crypto.encrypt(password, crypto.CHIPERS.AES_128, crypto.ENCODING.BASE64);
            //SP to check username and password
            knex.raw(Constant.Call.StoreProcedure+ 
                Constant.Procedure.APPLogin+"('" + username + "', '" + encryptedText + "');").then(function (results) {        
                if (!_.isEmpty(results[0][0][0])) {
                    //if match in DB, pass response to handler 
                    Constant.APIResponse.code = Constant.HttpStatusCode.StatusOK;
                    Constant.APIResponse.data = results[0][0][0];
                    Constant.APIResponse.description = Constant.HttpStatusText(Constant.HttpStatusCode.StatusOK);
                    return done(null, results[0][0][0]);
                } else {
                    //handle error
                    return done(new _Error.UnauthorizedAccessError(Constant.APIErrorCode.StatusInvalidCredentails, { message: Constant.APIErrorText(Constant.APIErrorCode.StatusInvalidCredentails) }));
                }
            }).catch(function (err) {
                //if request is invalid, send response
                return done(new _Error.UnauthorizedAccessError(Constant.APIErrorCode.StatusInvalidCredentails, { message: Constant.APIErrorText(Constant.APIErrorCode.StatusInvalidCredentails) }));
            });
        }
        else {
            return done(new _Error.BadRequestError(Constant.APIErrorCode.StatusInvalidRequest, { message: Constant.APIErrorText(Constant.APIErrorCode.StatusInvalidRequest) }), null);
        }
    }
));

passport.use(new TokenStrategy(
    function (refreshToken, token, done) {
        if (_.isEmpty(refreshToken) || _.isEmpty(token)) {
            return done(new _Error.UnauthorizedAccessError(Constant.APIErrorCode.StatusTokenNotFound, { message: Constant.APIErrorText(Constant.APIErrorCode.StatusTokenNotFound) }));
        } else {
            tokenmanager.verifyRefreshToken(refreshToken, token, knex).then(function (result) {
                done(null, refreshToken);
            }).catch(function (err) {
                done(err);
            });
        }
    }
));

passport.use(new BearerStrategy({ passReqToCallback: true },
    function (req, token, done) {
        if (token) {
            jwt.verify(token, config.appsecret, function (err, decoded) {
                if (err) {
                    if (req.originalUrl.indexOf("validatetoken") != -1) {
                        done(null, { "expired": true });
                    } else {
                        done(new _Error.UnauthorizedAccessError(1001, { message: err.name }));
                    }
                } else {
                    done(null, decoded);
                }
            });
        } else {
            done(new _Error.UnauthorizedAccessError(1001,{ message: "Invalid_Token" }));
        }
    }
));

module.exports.authenticate = function (req, res) {
    return new Promise(function (resolve, reject) {
        if (req.user) {
            try {
                var data = {
                    token: jwt.sign({ aud: config.appuser }, config.appsecret, {
                        expiresIn: '7d'
                    })
                };
            } catch (e) {
                reject(e);
            }
            
            var decoded = jwt.decode(data.token);
            data.token_exp = decoded.exp;
            data.token_iat = decoded.iat;
            data.UserID = req.user.id;
            data.FirstName = req.user.fname;
            data.LastName = req.user.lname;
            
            tokenmanager.addRefreshToken(data.token, knex).then(function (refreshToken) {
                data.refreshToken = refreshToken;
                
                /*Constant.APIResponse.code = Constant.HttpStatusCode.StatusOK;
                Constant.APIResponse.data = data;
                Constant.APIResponse.description = Constant.HttpStatusText(Constant.HttpStatusCode.StatusOK);
                resolve(Constant.APIResponse);
                */

                resolve({ "result": data });
            }).catch(function (error) {
                reject(error);
            });
        }
        else {
            reject(null);
        }
    });
}

module.exports.refreshToken = function (req, res) {
	return new Promise(function (resolve, reject) {
        if (req.user) {
            try {
                var data = {
                    token: jwt.sign({ _id: req.user }, config.appsecret, {
                        expiresIn: '7d'
                    })
                };
            } catch (e) {
                reject(e);
            }
            
            var decoded = jwt.decode(data.token);
            data.token_exp = decoded.exp;
            data.token_iat = decoded.iat;
            
            tokenmanager.addRefreshToken(data.token, knex).then(function (refreshToken) {
                data.refreshToken = refreshToken;
                
                Constant.APIResponse.code = Constant.HttpStatusCode.StatusOK;
                Constant.APIResponse.data = data;
                Constant.APIResponse.description = Constant.HttpStatusText(Constant.HttpStatusCode.StatusOK);
                
                resolve(Constant.APIResponse);
            }).catch(function (error) {
                reject(error);
            });
        }
        else {
            reject(null);
        }
    });
}

module.exports.validatetoken = function (req, res) {
    return new Promise(function (resolve, reject) {
        if (req.user) {
            if (req.user.expired == true) {
                Constant.APIResponse.code = Constant.HttpStatusCode.StatusOK;
                Constant.APIResponse.data = { "expired": true };
                Constant.APIResponse.description = Constant.HttpStatusText(Constant.HttpStatusCode.StatusOK);
                resolve(Constant.APIResponse);
            } else {
                Constant.APIResponse.code = Constant.HttpStatusCode.StatusOK;
                Constant.APIResponse.data = { "expired": false };
                Constant.APIResponse.description = Constant.HttpStatusText(Constant.HttpStatusCode.StatusOK);
                resolve(Constant.APIResponse);
            }
        }
        else {
            reject(null);
        }
    });
}

module.exports.apiAuthentication = passport.authenticate('bearer', { session: false });
module.exports.userAuthentication = passport.authenticate('basic', { session: false });
module.exports.refreshTokenAuthentication = passport.authenticate('token', { session: false });