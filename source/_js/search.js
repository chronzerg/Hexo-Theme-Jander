var $ = require('jquery');

module.exports = function (globals) {
	var search = globals.filters.search.api.search;

    // Attach search inputs to each other
    $('.posts-search').keyup(function () {
        $('#top-bar-search input').val($(this).val());
    });
    $('#top-bar-search input').keyup(function () {
		search($(this).val());
    });

    // Process the query string
    var query = require('./codec').decode();
    if (query) {
        $('#top-bar-search input').val(query);
		search(query);
    }
};
