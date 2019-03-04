module.exports = function (schema) {
    var mongoose = require('mongoose');

    schema.pre('save', function(next){
        var paciente = require('./index.js');
        var paciente = mongoose.model('Paciente');

        //Get the last patient and increase index to get the index for the next member
        paciente.findOne({}).sort('-numeropaciente').exec(function (err, member) {
            this.numeropaciente = member.numeropaciente+1;
            this.numvisita =0;
            console.log(this);
            next();
        });

    });
};
