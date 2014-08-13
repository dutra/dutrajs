
var Waterline = require('waterline');



var Album = Waterline.Collection.extend({
    identity: 'album',
    
    // Define a custom table name
    tableName: 'albums',

    // Set schema true/false for adapters that support schemaless
    schema: false,

    // Define an adapter to use
    connection: 'rethinkdb',

    // Define attributes for this collection
    attributes: {
	id: {
	    primaryKey: true,
	    required: true,
	    type: 'string'
	},
	title: {
            type: 'string',
            // also accepts any validations
            required: true
        },
	description: {
	    type: 'string'
	},
	photos: {
	    collection: 'photo',
	    via: 'album_id'
	}
	    
    }
});


module.exports = Album;
