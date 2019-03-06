module.exports = function (schema) {
    var crypto = require('crypto');
    schema.pre('save', function(next){
        if (this.password) {
            if (this.password.length < 90){
                var salt = crypto.randomBytes(16).toString('hex');
                var hash = crypto.pbkdf2Sync(this.password, salt, 2048, 32, 'sha512').toString('hex');
                this.password = [salt, hash].join('$');
                next();
            }else {
                next();
            }
        }else{
            next();
        }
    });




    schema.methods.resolveId = function (cb) {
        cb("iddddddé");
    };
// Create password hash using Password based key derivative function 2

};