
var Waterline = require('waterline');



var Scene = Waterline.Collection.extend({
    identity: 'scene',
    
    // Define a custom table name
    tableName: 'scenes',

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
	    via: 'scene_id'
	},
	coords: 'array'
	    
    }
});


module.exports = Scene;
