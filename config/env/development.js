module.exports = {
    database: {
        endpoint: "localhost:27017",
        name: "gestorDclinica",
        debug: false
    },
    bind: {
        port: 40000
    },
    images: {
      /*  gallery: {
            endpoint: "/gallery",
            filepath: __dirname + "/../../image",
            listDirectory: ["admin"],
            postImage: ["admin"],
            deleteImage: ["admin"]
        },*/
        path: __dirname + "/../../image",
        cache: __dirname + "/../../image/.cache",
        galleryFolder: __dirname + "/../../images"
    },
    auth: true,
    swagger: false,
    logger: {
        level: 'debug'
    }
    /*ssl:{
     enabled: true,
     key: 'C:/Users/micarpeta/mikey',
     cert: '/Users/Jordi/micarpeta/micert'
     }*/
};
