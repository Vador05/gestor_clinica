var backoffice = require('./backoffice');

module.exports = {
    id: "_id",
    path: "cita",
    plural: "citas",
    displayField: "paciente.nombre",
    extraDisplayFields: ["paciente.apellido","horainicio","doctor","tipovisita.nombre"],
    get: {

    },
    post: {
        roles:["user"]
    },
    put: {
        roles:["user", "admin"]
    },
    delete: {
        roles:["user"]
    },
    search: {
        roles:["user"],
        profiles: {
            _default: {
//                populate:["tipovisita", "paciente"]
                populate:["tipovisita"]
            }
        }
    },
    export: {
        roles:["user"],
        profiles: {
            _default: {
                populate:["mutua", "paciente"],
                addFields:["mutua.nombre","paciente.nombre","paciente.apellido","paciente.telefono"]
            }
        }
    },
    import: {
        roles:["user"]
    },
    validate: {
      //  roles:["user"]
    },
    backoffice: backoffice,
    /*form: {
        tabs: [
            {
                title: "Other",
                items: ["eeeeo", {
                    key: "array",
                    items: ["array[]", {type: 'button', style: 'btn-danger', title: 'DANGER!', onClick: "cancel()"}]
                }]
            }
        ]
    }*/

    form:{
        items:['*']
    }
};
