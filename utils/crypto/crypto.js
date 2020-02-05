"use strict";
var crypto = require("crypto");
var config = require("../../config")

module.exports = {
    
    encryptText : function (text, algo ,encoding) {
        var cipher = crypto.createCipheriv(algo, (config.crypto.KEY instanceof Buffer) ? config.crypto.KEY : new Buffer(config.crypto.KEY), (config.crypto.IV instanceof Buffer) ?  config.crypto.IV : new Buffer(config.crypto.IV));
        encoding = encoding || "binary";
        var result = cipher.update(text, "utf8", encoding);
        result += cipher.final(encoding);
        return result;
    },
    
    decryptText : function (text , algo , encoding) {
        var decipher = crypto.createDecipheriv(algo, (config.crypto.KEY instanceof Buffer) ? config.crypto.KEY : new Buffer(config.crypto.KEY), (config.crypto.IV instanceof Buffer) ?  config.crypto.IV : new Buffer(config.crypto.IV));
        encoding = encoding || "binary";
        var result = decipher.update(text, encoding);
        result += decipher.final();
        return result;
    },
    
    CIPHERS: {
        AES_128 : "aes128",          //requires 16 byte key
        AES_128_CBC : "aes-128-cbc", //requires 16 byte key
        AES_192: "aes192",          //requires 24 byte key
        AES_256: "aes256"           //requires 32 byte key
    },
    
    ENCODING : {
        BASE64 : 'base64',
        BINARY : 'binary'
    }

}
