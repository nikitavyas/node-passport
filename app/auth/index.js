//defining routes for login, authentication and api
module.exports = {
    login: require('./auth').userAuthentication,
    api : require('./auth').apiAuthentication,
    authenticate : require('./auth').authenticate,
    token : require('./auth').refreshTokenAuthentication,
   	refreshToken : require('./auth').refreshToken,
   	validatetoken : require('./auth').validatetoken
}