//defining routes for token generations
module.exports = {
    addRefreshToken: require('./tokenmanager.db').addRefreshToken,
    verifyRefreshToken: require('./tokenmanager.db').verifyRefreshToken
}