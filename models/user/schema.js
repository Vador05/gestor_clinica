var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId
    , injector = require('route-injector').MongooseInjector
    , jsonform = require('route-injector').MongooseJsonform;

var schema = new Schema({
        niceName: {type: String, required: true, feedback: false, title: "The nicename", i18nTitle: 'USER.NICENAME'},
        username: {type: String, required: true, unique: true, i18nTitle: 'USER.USERNAME'},
        name: {type: String, i18nTitle: 'USER.NAME'},
        password: {type: String, i18nTitle: 'USER.PASSWORD', format: 'password'},
        //users: {type: ObjectId, ref: 'User', dependsOn: 'password=niceName'},
        //newField: {type: String, feedback: true},
        role: {type: String, enum: ['admin', 'pacient','doctor','recepcion'], i18nTitle: 'USER.ROLE'},
        domicilio:{type: String},
        dni:{type: String},
        numeroColegiado:{type: String},
        telefono:{type: String}


        // add: {
        //    add2: {type: String, i18nTitle: 'USER.ADD2'}
        //}
    },
    {
        id: false
    }
);

//schema.methods.addRequest = function (req) {
//    console.log(req);
//    this.__req = req;
//};

require('./functions')(schema);

//Is used to enable refection in security middleware
schema.plugin(jsonform, {
    excludedPaths: ['_id', '__v',] //these paths are generally excluded
});

schema.plugin(injector, require('./injector'));

exports.getSchema = function () {
    return schema;
};
