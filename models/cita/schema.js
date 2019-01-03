var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId
    , injector = require('route-injector').MongooseInjector
    , jsonform = require('route-injector').MongooseJsonform;

var schema = new Schema({
	horainicio: {type: Date, required: false, feedback: false},
	horafinal: {type: Date, required: false, feedback: false},
	paciente: {type: ObjectId, ref: "Paciente"},
	doctor: {type: ObjectId, ref: "User"},
	tipovisita: {type: ObjectId, ref: "TipoVisita"},
        comentarios: {type:String, format: 'textarea',title:"Comentarios de la visita"},
	//TODO Mutua automatico desde paciente
	//TODO Precio automatico desde tipovisita
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
