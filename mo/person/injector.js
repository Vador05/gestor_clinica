module.exports = {
    id: "_id",
    path: "person",
    plural: "persons",
    displayField: "name",
    extraDisplayFields: [],
    section: "hola.que",
    visible: true,
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
