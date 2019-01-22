module.exports = {
    backoffice: true, // if true goes it's inserted on the backoffice. If not, it's suposed to work standalone
    url: 'with',
    template: 'bck_with_menu/index.html',
    controller: 'withMenu',
    auth: true,
    menu: {
        title: "Calendario",
        section: "Calendario",
        clickTo: 'with'
    }

    //backoffice: false // standalone website
};
