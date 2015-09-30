"use restrict"; // restrict mode for JavaScript;

requirejs.config({
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

$(document).ready(function() {
    var checkLogin = function() {
        $.ajax({
            dataType: "json",
            type: "GET",
            url: "http://www.counterdraft.systems/api/login/",
            data: {},
            success: function(obj) {
                if(obj.user){
                    $('#navbar').addClass('show-dashboard');
                }
            }

        });
    }();

});

window.Counter = {
    Navigation: {
        set: function(title) {
            $('.counter-nav .navbar-nav a').removeClass('active');
            $('.counter-nav .navbar-nav a.' + title + '-nav').addClass('active');
            console.log('counter-nav .navbar-nav a.' + title + '-nav');
            //add other navgation items if needed.
        },

        authState: function() {
            var storage = window.localStorage;
            console.log(storage);
        }

    },

    showLoader: function(shouldShow) {
        var $loader = $('#counter-load');
        var className = 'active';
        if (shouldShow === true) {
            $loader.toggleClass(className);
        } else if (shouldShow === false) {
            $loader.removeClass(className);
        } else {
            $loader.toggleClass(className);
        }
        return false;
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
