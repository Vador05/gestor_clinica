//var checkRole = injector.security.checkRole;
//var getUserIfExists = injector.security.getUserIfExists;
//
//module.exports.route = function (router) {
//    router.get('/myCustomRoute/:myParam', checkRole('admin').middleware, function JuanitoFuncador(req, res) {
//        res.json({result: "OK", param: req.params.myParam});
//    });
//
//    router.get('/populate', function (req, res) {
//
//    });
//
//    router.get('/profiler', function (req, res) {
//        var mongoose = require('mongoose');
//        mongoose.connection.db.collection("system.profile", function (err, collection) {
//            collection.find({}).toArray(function (err, results) {
//                res.json(results);
//                return res.end();
//            })
//        });
//    });
//};
//
/*
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gestorDclinica');
var db = mongoose.connection;
db.bind('citas');

module.exports.route = function (app, injector) {
    app.get('/centollo', function (req, res) {
        res.json({
            hola: "que tal"
        });
        return res.end();
    });
    app.get('/data',function(req,res){
        db.event.find().toArray(function(err,data){
            console.log(data)
            for (var i =0; i<data.length;i++)
                data[i].id = data[i]._id;

            res.send(data);
        });

    });

    app.post('/data', function (req, res) {
        var data = req.body;
        var mode = data["!nativeeditor_status"];
        var sid = data.id;
        var tid = sid;
        //Let's check what we are getting :
        console.log(data);
        //The calendar by default adds some id that we don't want to preserve in order
        //to make mongo to heve it's own mongo id.
        delete  data.id;
        delete  data["!nativeeditor_status"];
        var cita ={
            horainicio: data.start_date,
            horafinal:data.end_date ,
            paciente:data.text ,
            doctor: "",
            tipovisita:"",
            comentarios: ""
        };

         console.log(cita)
        if (data.speciality){
            cita.tipovisita  = data.speciality;
        }
        if (data.comments){
            cita.comentarios = data.comments;
        }
        function update_response(err,result) {
            if (err)
                mode = "error";
            else if (mode == "inserted")
                tid = data.id;

            res.setHeader("Content-Type", "application/json");
            res.send({action: mode, sid: sid, tid: tid});
        }


        if (mode=="updated") {
            //db.event.updateById(sid, data, update_response);
            console.log("Actualizando un evento! con id "+sid )
            console.log(data)
        }
        else if (mode == "inserted") {
            console.log(data)
            db.event.insert(cita, update_response);
            console.log("Añadiendo una cita para el Dr."+cita.doctor+"!")
        }
        else if (mode == "deleted") {
            db.event.removeById(sid, update_response);
            console.log("Borrando un evento! con id "+sid)
        }
        else
            res.send("Not supported operation");

    });
}
*/