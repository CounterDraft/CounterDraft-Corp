define([], function() {
    var LocationModel = Backbone.Model.extend({
        urlRoot: "/api/location/",

        defaults: {
            number: null,
            street: null,
            city: null,
            country: null,
            zip: null,
            isPrimary: null
        }
    });

    return LocationModel;
});
