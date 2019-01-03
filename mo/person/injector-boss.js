module.exports = {
    id: "_id",
    path: "boss",
    plural: "bosses",
    displayField: "name",
    extraDisplayFields: ["salary"],
    get: {
        roles: ["user"]
    },
    post: {
        roles:["user"]
    },
    put: {
        roles:["user"]
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
    form:{
        items:['*']
    }
};
