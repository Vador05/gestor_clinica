module.exports = {
    database: {
        endpoint: "mongo:27017",
        name: "routeinjector",
        debug: false
    },
    bind: {
        port: 40000
    },
    images: {
        path: __dirname + "/../../image",
        cache: __dirname + "/../../image/.cache",
        galleryFolder: __dirname + "/../../images"
    },
    auth: true,
    swagger: true,
    logger: {
        level: 'trace'
    }
    /*ssl:{
        enabled: true,
        key: 'C:/Users/micarpeta/mikey',
        cert: '/Users/Jordi/micarpeta/micert'
    }*/
};
