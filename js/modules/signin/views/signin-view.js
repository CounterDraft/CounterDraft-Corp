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
               
            },

            show:function(){
                $('#myModal').modal('show');
            }

            

            // render: function() {
            //     if(this.model.get('hidden')){
            //         $("#business-profile-display-switch").prop("checked", true);
            //     }else{
            //          $("#business-profile-display-switch").prop("checked", false);    
            //     }
            //     return this;
            // }

        });
        return SigninView;
    });
