module.exports = {
    adminRole: "admin",
    /*shards: {
        'admin': {
            blacklist: []
        },
        'operator': {
            whitelist: []
        }
    },*/
    routes: {
        Basic: {
            all: ['admin', 'user'],
            get: ['user']
        }, Advanced: {
            post: ['user']
        },
        User:{
            all:['admin']
        }
    }
};