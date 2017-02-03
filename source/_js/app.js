var $ = require('jquery');
var Dominate = require('dominate-core');
var DIoDom = require('dominate-io-dom'); 
var DSearch = require('dominate-filter-search');
var DPages = require('dominate-filter-pages');

var globals = {
	filters: {}
};

$(function () {
	// Setup Dominate
    $('.posts').each(function () {
        var hasSearch = Boolean($(this).find('.posts-search').length);
        var hasPages = Boolean($(this).find('.posts-pages').length);

        if (hasSearch || hasPages) {
			var io = DIoDom($(this).find('.posts-list'), $);
            var d = new Dominate(io.inputNode, io.outputNode);

            if (hasSearch) {
                var info = d.addFilter(DSearch, {
					descClass: 'data',
					descAttr: 'data-value',
                    $input: $(this).find('.posts-search'),
					$: $
                });
				globals.filters.search = info;
            }

            if (hasPages) {
                var info = d.addFilter(DPages, {
                    $prev: $(this).find('.posts-prev'),
                    $next: $(this).find('.posts-next'),
					indexes: {
						$container: $(this).find('.posts-indexes'),
						classes: ['button'],
						otherClass: 'hollow'
					}
                });
				globals.filters.pages = info;
            }
        }
    });

	// Run page specific code...
    require('./loader')(globals);
});
