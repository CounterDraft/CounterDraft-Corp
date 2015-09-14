define([
        "text!../templates/create-account-form.html",
        "modules/location/views/edit-location-view",
        "base/view",
        "base/modal"

    ],
    function(Template,
        LocationView,
        View,
        Modal) {
        var CreateAccountView = View.extend({

            locationView: null,

            events: {
                "click a": "onClick",
                "submit": "onSubmit"
            },

            template: _.template(Template),

            postRender: function() {
                //
            },

            showLocationModal: function() {
                if (this.locationView) {
                    this.locationView.show();
                } else {
                    this.locationView = new Modal({

                        view: new LocationView(),
                        templateType: 0

                    }).render().show();
                }
            },

            onClick: function(event) {
                event.stopPropagation();
                event.stopImmediatePropagation();

                switch (event.currentTarget.text.toUpperCase()) {
                    case 'FIND LOCATION':
                        this.showLocationModal(event);
                        break;
                }

                return false;
            },

            onSubmit: function(event) {
                event.stopPropagation();
                event.stopImmediatePropagation();
                console.log('submit');
                return false;
            }

        });
        return CreateAccountView;
    });
