var rethinkdbAdapter = require(__base + '/models/adapter');
var mongoAdapter = require(__base + '/node_modules/sails-mongo/lib/adapter');

module.exports = {
    adapters: {
        'default': rethinkdbAdapter,
        rethinkdb: rethinkdbAdapter,
	mongoAdapter: mongoAdapter
    },
    connections: {
        mongo: {
            adapter: 'mongoAdapter',
            host: 'localhost',
            port: 27017,
            database: 'dutrajs'
        },
        rethinkdb: {
            adapter: 'rethinkdb',
            host: "db.dutra.io",
            port: 28015,
            authKey: "",
            db: "dutrajs"
        }
    },
    express: {
        port: 3000
    }
}
