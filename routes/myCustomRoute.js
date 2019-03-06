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
var mongoose = require('mongoose');

var cita = require('../models/cita/index.js');
var cita = mongoose.model('Cita');

var mutua = require('../models/mutua/index.js');
var mutua = mongoose.model('Mutua');

var paciente = require('../models/paciente/index.js');
var paciente = mongoose.model('Paciente');

var tipovisita = require('../models/tipovisita/index.js');
var tipovisita = mongoose.model('TipoVisita');


module.exports.route = function (app, injector) {
    app.get('/centollo', function (req, res) {
        res.json({
            hola: "que tal"
        });
        return res.end();
    });

//TODO update get to handle just the exact data: http://localhost:40000/data?dr=5c76400d9eb28ce79b820d7a&timeshift=-60&from=2019-02-25&to=2019-04-01
    app.get('/data', function (req, res) {
        console.log("LO ESTOY PETANDO!");
        var from = req.query.from;
        var to = req.query.to;

            if (req.query.dr) {
                var dr = req.query.dr;
                console.log(req.query.dr);
                cita.find({doctor: dr, horainicio: {"$gte": from, "$lt": to}}).exec(function (err, citas) {
                    //cita.find({doctor : dr}).populate("paciente").exec(function (err, citas) {
                    //cita.find({}).exec( function (err, citas) {
                    if (err) {
                        return res.send(500, err.message);
                    }
                    else if (citas == undefined) {
                        res.send(500, "No Citas on the DB");
                    }

                    var result = [];

                    for (var i = 0; i < citas.length; i++) {
                        var horai = new Date(citas[i].horainicio.getTime() - (citas[i].offset * 60000));
                        var horaf = new Date(citas[i].horafinal.getTime() - (citas[i].offset * 60000));
                        // console.log(horai);
                        horai = horai.toISOString(); //citas[i].horainicio.toISOString();
                        //console.log(String(horai));
                        horai = String(horai).split("T");
                        var horaii = horai[1].split(":");
                        horai = horai [0] + " " + horaii [0] + ":" + horaii [1];
                        horaf = horaf.toISOString();
                        horaf = String(horaf).split("T");
                        var horaff = horaf[1].split(":");
                        horaf = horaf [0] + " " + horaff [0] + ":" + horaff [1];
                        result.push({
                            "id": citas[i]._id,
                            "start_date": horai,
                            "end_date": horaf,
                            "paciente": citas[i].paciente._id,
                            "text": citas[i].paciente.nombre + " " + citas[i].paciente.apellido,
                            "doctor": citas[i].doctor,
                            "tipo_visita": citas[i].tipovisita,
                            "notas": citas[i].comentarios,

                        })
                    }

                    res.status(200).json(result);
                })
            } else {
                //Original function definition modified due the need of getting the patient data
                //cita.find({}).exec( function (err, citas) {
                //Definition of the function v.1 modified for use with populate to get more data about patients.
                //cita.find({}).populate("paciente").exec(function (err, citas) {
                //Definition V.2 using denormalization we create a object for patient which will contain the patient data avoiding the need of populate.
                cita.find({horainicio: {"$gte": from, "$lt": to}}).exec(function (err, citas) {
                    if (err) {
                        return res.send(500, err.message);
                    }
                    else if (citas == undefined) {
                        res.send(500, "No Citas on the DB");
                    }

                    var result = [];

                    for (var i = 0; i < citas.length; i++) {
                        var horai = new Date(citas[i].horainicio.getTime() - (citas[i].offset * 60000));
                        var horaf = new Date(citas[i].horafinal.getTime() - (citas[i].offset * 60000));
                        // console.log(horai);
                        horai = horai.toISOString(); //citas[i].horainicio.toISOString();
                        //console.log(String(horai));
                        horai = String(horai).split("T");
                        var horaii = horai[1].split(":");
                        horai = horai [0] + " " + horaii [0] + ":" + horaii [1];
                        horaf = horaf.toISOString();
                        horaf = String(horaf).split("T");
                        var horaff = horaf[1].split(":");
                        horaf = horaf [0] + " " + horaff [0] + ":" + horaff [1];
                        //console.log(citas[i]);
                        result.push({
                            "id": citas[i]._id,
                            "start_date": horai,
                            "end_date": horaf,
                            "paciente": citas[i].paciente._id,
                            "text": citas[i].paciente.nombre + " " + citas[i].paciente.apellido,
                            "doctor": citas[i].doctor,
                            "tipo_visita": citas[i].tipovisita,
                            "notas": citas[i].comentarios,

                        })
                    }

                    res.status(200).json(result);
                })
            }

    });

    app.post('/data', function (req, res) {
        var data = req.body;
        var mode = data["!nativeeditor_status"];
        var sid = data.id;
        var tid = sid;

        //Let's check what we are getting :
        //console.log(data);
        //The calendar by default adds some id that we don't want to preserve in order
        //to make mongo to heve it's own mongo id.
        // delete  data.id;
        delete  data["!nativeeditor_status"];

        function update_response(err, result) {
            if (err)
                mode = "error";
            else if (mode == "inserted")
                tid = data.id;

            res.setHeader("Content-Type", "application/json");
            res.send({action: mode, sid: sid, tid: tid});
        }


        if (mode == "updated") {
            paciente.findOne({_id: data.paciente}, function (err, pacient) {
                if (err) {
                    res.status(500).send("Internal server error");
                } else {

                    tipovisita.findOne({_id: data.tipo_visita}, function (err, tipo) {
                        if (err) {
                            res.status(500).send("Internal server error");
                        } else {
                            var now = new Date();
                            var ncita = {
                                horainicio: data.start_date,
                                horafinal: data.end_date,
                                paciente : {
                                    _id : data.paciente,
                                    apellido : pacient.apellido,
                                    nombre : pacient.nombre
                                },
                                doctor: data.doctor,
                                tipovisita: data.tipo_visita,
                                comentarios: data.notas,
                                mutua: pacient.mutua,
                                precio: tipo.precio,
                                offset:   now.getTimezoneOffset()
                            }

                            cita.findByIdAndUpdate(
                                sid,
                                ncita,
                                {new: true},
                                (err, todo) => {
                                    // Handle any possible database errors
                                    if (err) return res.status(500).send(err);
                                    return res.send(todo);
                                }
                            )
                            pacient.proximavisita = data.start_date;
                            paciente.findByIdAndUpdate(
                                data.paciente,
                                pacient,
                                {new: true},
                                (err, todo) => {
                                    // Handle any possible database errors
                                    //if (err) return res.status(500).send(err);
                                    //    return res.send(todo);//TODO review if a messsage can be sent!
                                }
                            )
                        }
                    })

                }
            })
        }
        else if (mode == "inserted") {
            paciente.findOne({_id: data.paciente}, function (err, pacient) {
                if (err) {
                    res.status(500).send("Internal server error");
                } else {
                    //console.log("OFFSET---->" + data.end_date);//.getTimezoneOffset());
                    pacient = paciente(pacient)
                    // console.log("MUTUA------->>"+pacient.mutua);

                    tipovisita.findOne({_id: data.tipo_visita}, function (err, tipo) {
                        if (err) {
                            res.status(500).send("Internal server error");
                        } else {
                            //console.log(data);
                            var now = new Date();
                            var ncita = new cita({
                                horainicio: data.start_date,
                                horafinal: data.end_date,
                                paciente : {
                                    _id : data.paciente,
                                    apellido : pacient.apellido,
                                    nombre : pacient.nombre
                                },
                                doctor: data.doctor,
                                tipovisita: data.tipo_visita,
                                comentarios: data.notas,
                                mutua: pacient.mutua,
                                precio: tipo.precio,
                                offset: now.getTimezoneOffset()
                            })


                            ncita.save(function (err) {
                                if (err) res.status(500).send('Internal server error');
                                else res.status(200).json(ncita);
                              /*  console.log("Saving the following data");
                                console.log(ncita._doc);*/
                            })
                        }
                    })

                }
                pacient.ultimavisita = pacient.proximavisita;
                pacient.proximavisita = data.start_date;
                pacient.numvisita +=1;
                //TODO calcular edad
                paciente.findByIdAndUpdate(
                    data.paciente,
                    pacient,
                    {new: true},
                    (err, todo) => {
                        // Handle any possible database errors
                        //if (err) return res.status(500).send(err);
                    //    return res.send(todo);//TODO review if a messsage can be sent!
                    }
                )
            })


            //db.event.insert(data, update_response);
           // console.log("Añadiendo un evento!");
        }
        else if (mode == "deleted") {
            console.log(data);
            paciente.findOne({_id: data.paciente}, function (err, pacient) {
                if (err) {
                    res.status(500).send("Internal server error");
                } else {
                    pacient.proximavisita = pacient.ultimavisita;
                    pacient.numvisita -= 1;
                    paciente.findByIdAndUpdate(
                        data.paciente,
                        pacient,
                        {new: true},
                        (err, todo) => {
                            // Handle any possible database errors
                            //if (err) return res.status(500).send(err);
                            //    return res.send(todo);//TODO review if a messsage can be sent!
                        }
                    )
                    cita.remove({"_id": sid},
                        function (err) {
                            if (err) {
                                res.send(err);
                            }
                            else {
                                res.status(200).send("cita  borrada correctamente");
                            }
                        });
                }
            });
        }

        else
            res.send("Not supported operation");

    });

    app.post('/dataexport',function(req,res){
        var data = req.body;
     //   console.log(data);

        cita.find({
            horainicio: {
                $gte: ISODate(data.min_date),
                $lt: ISODate(data.max_date)
            }
        })
        res.send(200)
       // console.log(data.min_date);



    });
}