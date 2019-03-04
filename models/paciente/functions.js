module.exports = function (schema) {
    var mongoose = require('mongoose');

    schema.pre('save', function(next){
        var paciente = require('./index.js');
        var paciente = mongoose.model('Paciente');
        var that = this;


        this.numvisita =0;
        //Get the last patient and increase index to get the index for the next member
        paciente.findOne({}).sort('-numeropaciente').exec(function (err, member) {
            that.numeropaciente = member.numeropaciente+1;
            next();
            //TODO nif_check unfinished;
        });



    });
//Only valid for spain, original function from: https://donnierock.com/
    function nif_check(nif, nif_type) {
        if (nif_type=='Pasaporte'){
            return (true)

        }else if (nif_type=='NIE')
        {
            // X = 0
            // Y = 1
            // Z = 2

        }

        var numero;
        var letrActual;
        var letraCalc;
        var expresion_regular_dni;

        expresion_regular_dni = /^\d{8}[a-zA-Z]$/;

        if(expresion_regular_dni.test (nif) == true){
            numero = nif.substr(0,nif.length-1);
            letrActual = nif.substr(nif.length-1,1);
            numero = numero % 23;
            letraCalc='TRWAGMYFPDXBNJZSQVHLCKET';
            letraCalc=letraCalc.substring(numero,numero+1);
            if (letraCalc!=letrActual.toUpperCase()) {
                alert('Dni erroneo, la letra del NIF no se corresponde');
                return(false);
            }else{
                alert('Dni correcto');
                return(true);
            }
        }else{
            alert('Dni erroneo, formato no válido');
            return(true);
        }
    }
};
