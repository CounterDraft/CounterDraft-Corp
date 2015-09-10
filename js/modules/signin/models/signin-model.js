define(function() {
    var SigninModel = Backbone.Model.extend({
        urlRoot: "/api/signin/",

        defaults: {
            username: null,
            password: null
        }
    });
    return SigninModel;
});
