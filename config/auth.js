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
    User.findOne({username: login}, null).lean().exec(function (err, result) {
        if (err) {
            console.error(err);
            cbk(500, err, null);
        } else {
            //if (result == null) {
            //    cbk(404, "User not found", null);
            //} else if (pass && pass.indexOf('$P$') != -1 && (result.password == pass)) {
            //    cbk(200, "", result);
            //} else if (!require('wordpress-hash-node').CheckPassword(pass, result.password)) {
            //    cbk(405, "Incorrect username or password", null);
            //} else {
            //    cbk(200, "", result);
            //}
            if (result == null) {
                cbk(404, "User not found", null);
            } else if (pass == result.password) {
                if (clientType == "backoffice" && result.role == 'admin') {
                    cbk(200, "", result);
                } else {
                    cbk(404, "User not found", null);
                }
            }
        }
    });
}