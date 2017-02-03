// Loads page specific javascript.

var $ = require('jquery');

var pageModules = {
    home: [require('./face')],
    search: [require('./search')]
};

module.exports = function (globals) {
    var page = $('body').attr('data-page');
    if (page && pageModules[page]) {
        pageModules[page].forEach(function (initModule) {
            initModule(globals);
        });
    }

    if (page !== 'search') {
        require('./searchAll')(globals);
    }
};
