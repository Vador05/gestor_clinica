module.exports = function (injector) {
    injector.log.debug("We are bootstraping");
    var User = injector.models.User;
    new User({niceName: "tab1"}).save();
    new User({niceName: "tab2"}).save();
    new User({niceName: "tab3"}).save();
    new User({niceName: "tab4"}).save();
    new User({niceName: "tab5"}).save();
    new User({niceName: "tab6"}).save();
    new User({niceName: "tab7"}).save();
};

/*module.exports = {
    model: "Tab",
    format: "json", //CSV, EXCEL
    files: ['file1.json', 'file2.json'], //Each file, a single document, or an array,
    when: {
        env: ['bootstrap'], //the environments to enable the bootstraping,
        arg: 'bootstrap', //when this argument is present, do bootstrapping
        always: true //if not set, only when database is empty
    }
};*/