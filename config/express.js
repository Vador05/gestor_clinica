module.exports.load = function(injector) {
    return {
        globalMiddlewares: {
            get: [],
            post: []
        },
        modelMiddlewares: {
            Basic: {}
        }
    }
};