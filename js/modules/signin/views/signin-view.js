define([
        "base/view",
        "text!../templates/signin-tmpl.html"
    ],
    function(
        View,
        Template) {
        var SigninView = View.extend({
            model: null,
            template: _.template(Template),

            events: {
                'submit': 'onSubmit',
                'click .modal-footer button': 'onClick'
            },

            postRender: function() {
                $(this).focus();
                $('#counter-modal').on('shown.bs.modal', $.proxy(function() {
                    document.activeElement.blur();
                    this.$(".modal-body :input:visible").first().focus();
                }, this));
            },

            onClick: function(event) {
                event.stopPropagation();
                event.stopImmediatePropagation();
                switch ($(event.currentTarget).text().toUpperCase()) {
                    case 'SIGNIN':
                        break;
                }
            },

            onSubmit: function(event) {
                event.stopPropagation();
                event.stopImmediatePropagation();
                console.log('SUBMIT INFORMATION TO BACKEND!!!');

                this.trigger('close-modal');

                return false;
            }

        });
        return SigninView;
    });
