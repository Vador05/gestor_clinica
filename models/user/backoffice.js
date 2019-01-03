module.exports = {
    calculatediscount: function (params, send) {
        console.log(params);
        if (params.total > 200) {
            send(10);
        }
        else {
            send(0);
        }
    },
    calculateHundreds: function(params, send){
        console.log("TOTAL", params);
        send(Math.floor(params[Object.keys(params)[0]]/100));
    }
};