var mongoose = require('mongoose')
    , extend = require('mongoose-schema-extend')
    , util = require('util')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId
	, injector = require('route-injector').MongooseInjector
	, jsonform = require('route-injector').MongooseJsonform;

function BaseSchema() {
	Schema.apply(this, arguments);
	this.add({
		name: {type: String, required: true}
	})
}
util.inherits(BaseSchema, Schema);

/*var schema = new Schema({
        name: {type: String, required: true},
    },
    {
        id: false,
    	collection: 'personucas'
        , discriminatorKey: '__t'
    }
);
*/

var schema = new BaseSchema();

//Is used to enable refection in security middleware
schema.plugin(jsonform, {
    excludedPaths: ['_id', '__v'] //these paths are generally excluded
});

schema.plugin(injector, require('./injector'));

// EXTENSION
//var EmployeeSchema = schema.extend({
var EmployeeSchema = new BaseSchema({
	department: String
});

EmployeeSchema.plugin(jsonform, {
    excludedPaths: ['_id', '__v'] //these paths are generally excluded
});

EmployeeSchema.plugin(injector, require('./injector-employee'));

exports.getEmployee = function() {
	return EmployeeSchema;
}

//var BossSchema = schema.extend({
var BossSchema = new BaseSchema({
	salary: Number,
    	companyCarModel: String
});

BossSchema.plugin(jsonform, {
    excludedPaths: ['_id', '__v'] //these paths are generally excluded
});

BossSchema.plugin(injector, require('./injector-boss'));

exports.getBoss= function() {
	return BossSchema;
}

// END-EXTENSION

exports.getSchema = function () {
    return schema;
};
