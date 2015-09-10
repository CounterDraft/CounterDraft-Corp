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
    },
    showSignin: function() {
        this.googleAnalytics.ga('signin');
        require(['modules/signin/views/signin-view'], function(SigninView) {
            var model = new Backbone.Model();
            var signinView = new SigninView({
                clasName: 'modal fade',
                id: 'myModal',
                model: model
            });

            $('body').prepend(signinView.render().$el);
            signinView.show();

        });
    }
}
