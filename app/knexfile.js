/*database configurations*/
module.exports = {

    DEV: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: '',
            database: 'qml'
        }, pool: {
            min: 0,
            max: 10
        }
    },

   LIVE: {
        client: 'mysql',
        connection: {
            host: '',
            user: '',
            password: '',
            database: ''
        }, pool: {
            min: 0,
            max: 10
        }
    }

};