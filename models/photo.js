
var Waterline = require('waterline');



var Photo = Waterline.Collection.extend({
    identity: 'photo',
    
    // Define a custom table name
    tableName: 'photo',

    // Set schema true/false for adapters that support schemaless
    schema: false,

    // Define an adapter to use
    connection: 'rethinkdb',

    // Define attributes for this collection
    attributes: {
	id: {
	    type: 'string'
	},
	title: {
            type: 'string',

            // also accepts any validations
            required: true
        }
    }
});


module.exports = Photo;
