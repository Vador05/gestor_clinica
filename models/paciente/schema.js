var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId
    , injector = require('route-injector').MongooseInjector
    , jsonform = require('route-injector').MongooseJsonform;

var schema = new Schema({
        nombre: {type: String, required: true, feedback: false},
        apellido: {type: String, required: true, feedback: false},
        nif: {type: String, required: true, feedback: false, tile: "documento de identificacion" },
        niftype: {type: String, required: true, feedback: false, title:"tipo de documento" },
        direccion: {type: String, required: false, feedback: false},
        provincia: {type: String, required: false, feedback: false},
        CP: {type: Number, required: false, feedback: false},
        fechanacimiento: {type: Date, required: false, feedback: false},
        his: {type: Number, required: false, feedback: false},
        numvisita: {type: Number, required: false, feedback: false},
        diagnostico: {type: ObjectId, ref: "Diagnostico"},
        mutua: {type: ObjectId, ref: "Mutua"},
        comentarios: {type:String, format: 'textarea'},

    },
    {
        id: false
    }
);

require('./functions')(schema);

//Is used to enable refection in security middleware
schema.plugin(jsonform, {
    excludedPaths: ['_id', '__v'] //these paths are generally excluded
});

schema.plugin(injector, require('./injector'));

exports.getSchema = function () {
    return schema;
};
