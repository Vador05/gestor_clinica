var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var schemaPerson = require('./schema').getSchema();
var modelPerson = mongoose.model('Person', schemaPerson);

var schemaEmployee = require('./schema').getEmployee();
//var modelEmployee = mongoose.model('Employee', schemaEmployee);
var modelEmployee = modelPerson.discriminator('Employee', schemaEmployee);

var schemaBoss = require('./schema').getBoss();
//var modelBoss = mongoose.model('Boss', schemaBoss);
var modelBoss = modelPerson.discriminator('Boss', schemaBoss);

module.exports.Model = [modelPerson, modelEmployee, modelBoss];
