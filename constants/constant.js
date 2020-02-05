/*default http status codes*/
var httpStatusCode = {
    StatusContinue: 100,
    StatusSwitchingProtocols: 101,

    StatusOK: 200,
    StatusCreated: 201,
    StatusAccepted: 202,
    StatusNonAuthoritativeInfo: 203,
    StatusNoContent: 204,
    StatusResetContent: 205,
    StatusPartialContent: 206,

    StatusMultipleChoices: 300,
    StatusMovedPermanently: 301,
    StatusFound: 302,
    StatusSeeOther: 303,
    StatusNotModified: 304,
    StatusUseProxy: 305,
    StatusTemporaryRedirect: 307,

    StatusBadRequest: 400,
    StatusUnauthorized: 401,
    StatusPaymentRequired: 402,
    StatusForbidden: 403,
    StatusNotFound: 404,
    StatusMethodNotAllowed: 405,
    StatusNotAcceptable: 406,
    StatusProxyAuthRequired: 407,
    StatusRequestTimeout: 408,
    StatusConflict: 409,
    StatusGone: 410,
    StatusLengthRequired: 411,
    StatusPreconditionFailed: 412,
    StatusRequestEntityTooLarge: 413,
    StatusRequestURITooLong: 414,
    StatusUnsupportedMediaType: 415,
    StatusRequestedRangeNotSatisfiable: 416,
    StatusExpectationFailed: 417,
    StatusTeapot: 418,

    StatusInternalServerError: 500,
    StatusNotImplemented: 501,
    StatusBadGateway: 502,
    StatusServiceUnavailable: 503,
    StatusGatewayTimeout: 504,
    StatusHTTPVersionNotSupported: 505,

    // New HTTP status codes from RFC 6585. Not exported yet in Go 1.1.
    // See discussion at https://codereview.appspot.com/7678043/
    statusPreconditionRequired: 428,
    statusTooManyRequests: 429,
    statusRequestHeaderFieldsTooLarge: 431,
    statusNetworkAuthenticationRequired: 511
};

/*default http status messages*/
var statusText = [];
statusText[httpStatusCode.StatusContinue] = "Continue";
statusText[httpStatusCode.StatusSwitchingProtocols] = "Switching Protocols";
statusText[httpStatusCode.StatusOK] = "OK";
statusText[httpStatusCode.StatusCreated] = "Created";
statusText[httpStatusCode.StatusAccepted] = "Accepted";
statusText[httpStatusCode.StatusNonAuthoritativeInfo] = "on-Authoritative Information";
statusText[httpStatusCode.StatusNoContent] = "No Content";
statusText[httpStatusCode.StatusResetContent] = "Reset Content";
statusText[httpStatusCode.StatusPartialContent] = "Partial Content";
statusText[httpStatusCode.StatusMultipleChoices] = "Multiple Choices";
statusText[httpStatusCode.StatusMovedPermanently] = "Moved Permanently";
statusText[httpStatusCode.StatusFound] = "Found";
statusText[httpStatusCode.StatusSeeOther] = "See Other";
statusText[httpStatusCode.StatusNotModified] = "Not Modified";
statusText[httpStatusCode.StatusUseProxy] = "Use Proxy";
statusText[httpStatusCode.StatusTemporaryRedirect] = "Temporary Redirect";
statusText[httpStatusCode.StatusBadRequest] = "Bad Request";
statusText[httpStatusCode.StatusUnauthorized] = "Unauthorized";
statusText[httpStatusCode.StatusPaymentRequired] = "Payment Required";
statusText[httpStatusCode.StatusForbidden] = "Forbidden";
statusText[httpStatusCode.StatusNotFound] = "Not Found";
statusText[httpStatusCode.StatusMethodNotAllowed] = "Method Not Allowed";
statusText[httpStatusCode.StatusNotAcceptable] = "Not Acceptable";
statusText[httpStatusCode.StatusProxyAuthRequired] = "Proxy Authentication Required";
statusText[httpStatusCode.StatusRequestTimeout] = "Request Timeout";
statusText[httpStatusCode.StatusConflict] = "Conflict";
statusText[httpStatusCode.StatusGone] = "Gone";
statusText[httpStatusCode.StatusLengthRequired] = "Length Required";
statusText[httpStatusCode.StatusPreconditionFailed] = "Precondition Failed";
statusText[httpStatusCode.StatusRequestEntityTooLarge] = "Request Entity Too Large";
statusText[httpStatusCode.StatusUnsupportedMediaType] = "Unsupported Media Type";
statusText[httpStatusCode.StatusTeapot] = "I'm a teapot";
statusText[httpStatusCode.StatusInternalServerError] = "Internal Server Error";
statusText[httpStatusCode.StatusNotImplemented] = "Not Implemented";
statusText[httpStatusCode.StatusBadGateway] = "Bad Gateway";
statusText[httpStatusCode.StatusServiceUnavailable] = "Service Unavailable";

/*default api response code and description*/
var Response = {
    code: 200,
    data: "",
    description: "OK"
};

var BulkImportCode = {
    SampleGenerated: 100,
    EmptyFile: 200,
    InvalidRecordsFound: 300,
    AllValidRecords: 400
};

/*custom error codes for all APIs*/
var APIErrorCode = {
    STATUSPOSTEMPTY: 1000,
    StatusInvalidToken: 1001,
    StatusTokenNotFound: 1002,
    StatusRefreshTokenNotFound: 1003,
    StatusEmptyToken: 1004,
    StatusInvalidCredentails: 1005,
    StatusSystemInfoNotFound: 1006, 
    Statusc: 1007,
    StatusRefreshTokenInvalidOrExpired: 1008,
    StatusInvalidUserID: 1009,
    StatusInvalidRequest: 5000
};

/*custom error messages for custom error codes*/
function APIErrorText(code) {
    switch (code) {
        case 1000:
            return "Post/Put must not be empty";
        case 1001:
            return "Invalid_Token";
        case 1002:
            return "Token_Not_Found";
        case 1003:
            return "Refresh_Token_Not_Found";
        case 1004:
            return "Missing_Token";
        case 1005:
            return "Invalid_Credentails";
        case 1006:
            return "Invalid_OR_Expired_Refresh_Token";
        case 1007:
            return "S3_Info_Not_Found";
        case 1008:
            return "Refresh_Token_Invalid_or_Expired";
        case 1009:
            return "Invalid_User_ID";
        case 5000:
            return "Invalid_Request";
        default:
            return "Invalid_Request";
    }
}

var Call =
{
    StoreProcedure: "Call "
}

/*Object to store call stored procedure names*/
var Procedure = {
    APPLogin: "UserLogin",
    UserSignup: "CreateUser",
    UpdateUser: "UpdateUser",
    UpdateUserStatus: "UpdateUserStatus",
    DeleteUser: "DeleteUser"
};

/*object to store call input parameters for all stored procedures*/
var DBParameter = {
    UserEmail: "inputemail"
};

var UserParameter = {
    UserId: "UserId"
};

var Message = {
    UserAccessRemoved: "User access for all departments removed successfully"
};

var URLS = {
    StagingUrl: ""
}

var General = {
    SpaceSign: " ",
    SpaceEqualSign: " = "
}

var Crypt = {
    CryptKey : "6c1462295bf43dd5210d120ac4dddee0",
    CryptIV : "oUxf4RIviiMXUBHs"
}

// StatusText returns a text for the HTTP status code. It returns the empty
// string if the code is unknown.
function StatusText(code) {
    return statusText[code];
}

module.exports.HttpStatusCode = httpStatusCode;
module.exports.HttpStatusText = StatusText;
module.exports.APIErrorCode = APIErrorCode;
module.exports.APIErrorText = APIErrorText;
module.exports.Procedure = Procedure;
module.exports.APIResponse = Response;
module.exports.BulkImportCode = BulkImportCode;
module.exports.Message = Message;
module.exports.UserParameter = UserParameter;
module.exports.DBParameter = DBParameter;
module.exports.General = General;
module.exports.Call = Call;
module.exports.Crypt = Crypt;