var backoffice = require('./backoffice');

module.exports = {
    id: "_id",
    path: "cita",
    plural: "citas",
    displayField: "paciente.nombre",
    extraDisplayFields: ["paciente.apellido","horainicio","doctor.niceName","tipovisita.nombre"],
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
                populate:["tipovisita","doctor"]
            }
        }
    },
    export: {
        roles:["user"],
        profiles: {
            _default: {
                populate:["mutua","doctor"],
                addFields:["mutua.nombre","paciente.nombre","paciente.apellido","paciente.telefono","doctor.niceName"]
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
