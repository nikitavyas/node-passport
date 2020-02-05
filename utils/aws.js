var AWS = require('aws-sdk');
var config = require('../config');

AWS.config.update({
    accessKeyId: config.aws.accesskey,
    secretAccessKey: config.aws.secretkey,
    region: config.aws.region
});

var s3 = new AWS.S3();

module.exports = s3;                                                     