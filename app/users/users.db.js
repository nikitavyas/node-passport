var Promise = require("bluebird");
var Constant = require('../../constants/constant');
var _Error = require('../../errors/errors');
var _ = require('lodash');

module.exports = function (knex) {
    updateuser = function (req) {
        return new Promise(function (resolve, reject) {
            knex.raw(Constant.Call.StoreProcedure+
                Constant.Procedure.UpdateUser +"(" + req.body.id + ", '" + 
                req.body.firstname + "', '" + 
                req.body.lastname + "', '" + 
                req.body.mobileno + "', '" + 
                req.body.address + "');").then(function (results) {
                    if (!_.isEmpty(results[0][0][0])) {
                        Constant.APIResponse.code = Constant.HttpStatusCode.StatusOK;
                        Constant.APIResponse.data = results[0][0][0];
                        Constant.APIResponse.description = Constant.HttpStatusText(Constant.HttpStatusCode.StatusOK);
                        resolve(Constant.APIResponse);
                    }
                    else {
                        Constant.APIResponse.code = Constant.HttpStatusCode.StatusNotFound;
                        Constant.APIResponse.data = Constant.HttpStatusText(Constant.HttpStatusCode.StatusNotFound);
                        Constant.APIResponse.description = Constant.APIErrorText(Constant.APIErrorCode.StatusInvalidUserID);
                        resolve(Constant.APIResponse);
                    }

                }).catch(function (err) {
                    reject(new _Error.BadRequestError(Constant.APIErrorCode.StatusInvalidRequest, { message: Constant.APIErrorText(Constant.APIErrorCode.StatusInvalidRequest) }));
                });
        });
    }

    changeuserstatus = function (req) {
        return new Promise(function (resolve, reject) {
            knex.raw(Constant.Call.StoreProcedure+
                Constant.Procedure.UpdateUserStatus +"(" + req.body.id + ", " + 
                req.body.userstatus + ");").then(function (results) {
                    if (results[0][0][0].rowsaffected >= 0) {
                        Constant.APIResponse.code = Constant.HttpStatusCode.StatusOK;
                        Constant.APIResponse.data = results[0][0][0];
                        Constant.APIResponse.description = Constant.HttpStatusText(Constant.HttpStatusCode.StatusOK);
                        resolve(Constant.APIResponse);
                    }
                    else {
                        Constant.APIResponse.code = Constant.HttpStatusCode.StatusNotFound;
                        Constant.APIResponse.data = Constant.HttpStatusText(Constant.HttpStatusCode.StatusNotFound);
                        Constant.APIResponse.description = Constant.APIErrorText(Constant.APIErrorCode.StatusInvalidUserID);
                        resolve(Constant.APIResponse);
                    }

                }).catch(function (err) {
                    reject(new _Error.BadRequestError(Constant.APIErrorCode.StatusInvalidRequest, { message: Constant.APIErrorText(Constant.APIErrorCode.StatusInvalidRequest) }));
                });
        });
    }

    deleteuser = function (req) {
        return new Promise(function (resolve, reject) {
            knex.raw(Constant.Call.StoreProcedure+
                Constant.Procedure.DeleteUser +"(" + req.params.id + ");").then(function (results) {
                    if (results[0][0][0].rowsaffected >= 0) {
                        Constant.APIResponse.code = Constant.HttpStatusCode.StatusOK;
                        Constant.APIResponse.data = results[0][0][0];
                        Constant.APIResponse.description = Constant.HttpStatusText(Constant.HttpStatusCode.StatusOK);
                        resolve(Constant.APIResponse);
                    }
                    else {
                        Constant.APIResponse.code = Constant.HttpStatusCode.StatusNotFound;
                        Constant.APIResponse.data = Constant.HttpStatusText(Constant.HttpStatusCode.StatusNotFound);
                        Constant.APIResponse.description = Constant.APIErrorText(Constant.APIErrorCode.StatusInvalidUserID);
                        resolve(Constant.APIResponse);
                    }

                }).catch(function (err) {
                    reject(new _Error.BadRequestError(Constant.APIErrorCode.StatusInvalidRequest, { message: Constant.APIErrorText(Constant.APIErrorCode.StatusInvalidRequest) }));

                });
        });
    }

    return this;
}