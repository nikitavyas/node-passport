var app = require('./app')
var config = require('./config')
var s3 = require('./utils/aws');
var port = 3000///process.env.PORT || config.api.PORT

app.listen(port, function (err) {

    if (err) {
        throw err
    }

    console.info('server is listening on ' + port + '...')
})