define([], function() {
    var ContactModel = Backbone.Model.extend({
        urlRoot: "/api/settings/",

        defaults: {
            from: null,
            subject: null,
            message: "No message."
        }
    });

    return ContactModel;
});
