var backoffice = require('./backoffice');

module.exports = {
    id: "_id",
    path: "user",
    plural: "users",
    displayField: "niceName",
    extraDisplayFields: ["password"],
    shard:{
        shardKey: "name",
        shardValues: ["A", "B", "C"]
    },
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
        roles:["user"]
    },
    export: {
        roles:["user"]
    },
    import: {
        roles:["user"]
    },
    validate: {},
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