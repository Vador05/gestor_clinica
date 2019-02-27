var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId
    , injector = require('route-injector').MongooseInjector
    , jsonform = require('route-injector').MongooseJsonform;

var schema = new Schema({
        horainicio: {type: Date, required: false, feedback: false,title:"Hora inicio"},
        horafinal: {type: Date, required: false, feedback: false,title:"Hora final"},
        paciente: {type: Schema.Types.Mixed, ref: "Paciente", denormalize:["nombre","apellido"], propagate: true},
        doctor:{type: ObjectId, ref: "User"},
        tipovisita: {type: ObjectId, ref: "TipoVisita",title:"Tipo de visita"},
        comentarios: {type:String, format: 'textarea',title:"Comentarios de la visita"},
        mutua :{type: ObjectId, ref: "Mutua"},
        precio:{type:Number,required: false, feedback: false, readonly: true},
        offset:{type:Number,required: false, feedback: false, readonly: true}
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
