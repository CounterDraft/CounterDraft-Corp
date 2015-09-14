define(["./view",
        "text!../modules/modal/templates/modal-a-tmpl.html"
    ],
    function(View, TemplateOne) {
        var Model = View.extend({

            view: null,
            template: _.template(TemplateOne),
            templateType: 0,
            el: null,

            initialize: function(options) {
                _.extend(this, options);
                this.$el = $('#counter-modal');
            },

            render: function() {
                if (this.templateType === 0) {
                    this.$el.html(this.template(new Backbone.Model()));
                }
                if (this.view) {
                    this.view.setElement(this.$('.modal-content'));
                    this.view.on('close-modal', function(){
                        this.close();
                        this.$el.modal('hide');
                        this.view.remove();
                    }, this);

                    this.view.render();
                }
                this.postRender();
                return this;
            },

            close: function(){

            },

            postRender: function(){


            },

            show: function(){
                this.$el.modal('show');
            }

        });

        return Model;
    });
