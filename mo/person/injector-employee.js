module.exports = {
    id: "_id",
    path: "employee",
    plural: "employees",
    displayField: "name",
    extraDisplayFields: ["department"],
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
