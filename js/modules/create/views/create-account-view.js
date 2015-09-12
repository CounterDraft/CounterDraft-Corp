define([
        "text!../templates/create-account-form.html",
        'base/view'
    ],
    function(Template,
        View) {
        var CreateAccountView = View.extend({
            events: {},
            template: _.template(Template),
            
            postRender: function(){
                console.log('somthing');
            }
        });
        return CreateAccountView;
    });
