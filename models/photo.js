
var Waterline = require('waterline');



var Photo = Waterline.Collection.extend({
    identity: 'photo',
    
    // Define a custom table name
    tableName: 'photos',

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
	album_id: {
	    model: 'album'
	},
	scene_id: {
	    model: 'scene'
	},
	apperture: {
	    type: 'string'
	},
	exposure_time: {
	    type: 'string'
	},
	focal_length: {
	    type: 'string'
	},
	iso: {
	    type: 'string'
	},
	coords: {
	    type: 'array'
	}

    }
});


module.exports = Photo;
