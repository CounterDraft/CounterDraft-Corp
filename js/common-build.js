"use restrict"; // restrict mode for JavaScript;

requirejs.config({
    baseUrl: "/js/",
    waitSeconds: 12,
    paths: {
        lib: "libs",
        text: 'libs/text',
        home: "/",
        tpl: "tpl",
        main: "main",
        async: "async",
        modules: "modules"
    }
});

window.Counter = {
    Navigation: {
        set: function(title) {
            $('ul.navbar-nav li').removeClass('active');
            $('ul.navbar-nav li.' + title + '-nav').addClass('active');
            //add other navgation items if needed.
        }

    },
    googleAnalytics: {
        ga: function() {
            console.log('loaded' + arguments);
        }
    }
}
