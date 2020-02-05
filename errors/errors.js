/*==========================================================================================================
=            All the errors are customize in order to have same the error-response for all API.           =
==========================================================================================================*/

/**
 *
 * Module depedencies
 *
 */

 var constant = require('../constants/constant');
 
 /**
  *
  * NotFoundError
  * @param {String} code
  * @return {Object} error
  * @api private
  */
 
function NotFoundError(code, error) {
    Error.call(this, typeof error === "undefined" ? undefined : error.message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "NotFoundError";
    this.message = typeof error === "undefined" ? undefined : error.message;
    this.code = typeof code === "undefined" ? "404" : code;
    this.status = 404;
    this.inner = error;
}

NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;

/* export NotFoundError */
module.exports.NotFoundError = NotFoundError;


/**
 *
 *  UnauthorizedAccessError
 *  @param {String} code
 *  @return {Object} error
 *  @api private
 */

function UnauthorizedAccessError(code, error) {
    Error.call(this, error.message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "UnauthorizedAccessError";
    this.message = error.message;
    this.code = code;
    this.status = 401;
    this.inner = error;
}

UnauthorizedAccessError.prototype = Object.create(Error.prototype);
UnauthorizedAccessError.prototype.constructor = UnauthorizedAccessError;

/* export UnauthorizedAccessError */
module.exports.UnauthorizedAccessError = UnauthorizedAccessError;


/**
 *
 *  BadRequestError
 *  @param {String} code
 *  @return {Object} error
 *  @api private
 */

function BadRequestError(code, error) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.name = 'BadRequestError';
    this.message = error.message;
    this.code = code;
    this.status = 400;
    this.inner = error
};

BadRequestError.prototype = Object.create(Error.prototype);
BadRequestError.prototype.constructor = BadRequestError;

/* export BadRequestError */
module.exports.BadRequestError = BadRequestError;


function InternalServerError(code, error) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.name = 'InternalServerError';
    this.message = error.message;
    this.code = code;
    this.status = 500;
    this.inner = error
};

InternalServerError.prototype = Object.create(Error.prototype);
InternalServerError.prototype.constructor = InternalServerError;

module.exports.InternalServerError = InternalServerError;