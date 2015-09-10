define([], function() {
    return Backbone.View.extend({
        model: null,
        template: null,
        options: null,

        initialize: function(options) {
        	_.defaults(this, options);
            this.options = options;
            this.model.bind("add", this.render, this);
            this.model.bind("remove", this.render, this);
            this.model.bind("change", this.render, this);
            this.postInitialize();
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.postRender();
            return this;
        },

        postInitialize: function() {
            //override this if needed.
        },

        postRender: function() {
            //override this if needed.
        }
    });

});
