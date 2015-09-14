define([
        "text!../templates/edit-location-tmpl.html",
        "base/view",
         "../models/location-model",
    ],
    function(Template,
        View,
        LocationModel) {
        var EditLocationView = View.extend({

            events: {
                "click a": "onClick",
                "submit": "onSubmit"
            },

            model: new LocationModel(),
            template: _.template(Template),

            postRender: function() {
                //
            }
        });
        return EditLocationView;
    });
