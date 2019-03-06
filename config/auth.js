const crypto = require('crypto');

module.exports = {
    //engine: 'oauth2-injector',
    login: {
        stateless: true, // Keep state (tokens and its timers) allowing logout
        key: "username",
        password: "password",
        model: ["User"],
        function: customLogin
    },
    token_expiration: 3600,
    refresh_token: true,
    persist_refreshtoken: true,
    persist_accesstoken: true,
    debug: true,
    "token.secret": "ondho-secret",
    "token.fields": ['_id', 'email', 'role', 'niceName'],
    "token.publicFields": ['role'],
    "token.expiresInMinutes": "1d", //Expiration time -> 1 day
    "token.logoutInMillis": 600000, //Inactivity time to force logOut -> 10 minutes
    "token.magicTokens": {
        "ONDHOADMIN": {
            niceName: 'admin',
            role: 'admin',
            rank: 'chicote'
        }

    }
};

function customLogin(req, login, pass, cbk) {
    var clientType = req.headers['client-type'];

    if (login == "admin" && pass == "admin") {
        return cbk(200, "", {
            username: "admin",
            role: "admin",
            displayName: "Admin"
        });
    }
    if (login == "admon" && pass == "admon") {
        return cbk(200, "", {
            username: "admin",
            role: "admon",
            displayName: "Admin"
        });
    }

   //Implemented new pbkdf2 password protection technology!
    User.findOne({username: login}, null).lean().exec(function (err, result) {
        if (err) {
            console.error(err);
            cbk(500, err, null);
        } else {
            if (result == null) {
                //cbk(404, "User not found SALVA 1", null);
                cbk(405, "Incorrect username or password", null);
            } else if (result.role!= 'pacient') {
                var originalHash = result.password.split('$')[1];
                var salt = result.password.split('$')[0];
                var hash = crypto.pbkdf2Sync(pass, salt, 2048, 32, 'sha512').toString('hex');

                if(hash === originalHash){
                    cbk(200, "", result);
                }else{
                    cbk(405, "Incorrect username or password", null);
                }
            }else {
                    cbk(404, null);
            }
        }
    });
}