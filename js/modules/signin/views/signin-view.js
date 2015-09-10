define([
        "base/view",
        "text!../templates/signin-tmpl.html"
    ],
    function(
        View,
        Template) {
        var SigninView = View.extend({

            events: {},
            model: null,
            template: _.template(Template),

            postRender: function(){

            }

        });
        return SigninView;
    });
