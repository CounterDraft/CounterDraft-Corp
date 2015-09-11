"use restrict"; // restrict mode for JavaScript;

requirejs.config({
    baseUrl: "/js/",
    waitSeconds: 12,
    paths: {
        lib: "libs",
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
    },
    showSignin: function() {
        this.googleAnalytics.ga('signin');

        require(['modules/signin/views/signin-view',
            'modules/signin/models/signin-model',
            'base/modal'
        ], function(SigninView, SigninModel, Modal) {

            var signinView = new SigninView({
                model: new SigninModel()
            });

            new Modal({
                view: signinView,
                templateType: 0
            }).render().show();


        });
    }
}
