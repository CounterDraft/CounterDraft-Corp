define([
        "text!../templates/contact-form-tmpl.html",
        'base/view'
    ],
    function(Template,
        View) {
        var ContactView = View.extend({

            events: {},

            template: _.template(Template),

            initialize: function() {
                this.model.bind("add", this.render, this);
                this.model.bind("remove", this.render, this);
                this.model.bind("change", this.render, this);
                this.$el.html(this.template(this.model.toJSON()));
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
        return ContactView;
    });
