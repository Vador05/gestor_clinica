module.exports = {
    //ROLE PERMISIONS !
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
            all: ['admin','doctor','recepcion'],
            get: ['user','pacient']
        }, Advanced: {
            post: ['admin','doctor','recepcion']
        },
        User:{
            all:['admin','doctor','recepcion']// TODO review, with the actual version the reception staff need to see the user list
        }
    }
};