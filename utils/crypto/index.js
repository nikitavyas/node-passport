module.exports = {
    encrypt: require('./crypto').encryptText,
    decrypt : require('./crypto').decryptText,
    CHIPERS : require('./crypto').CIPHERS,
    ENCODING : require('./crypto').ENCODING
}