define([], function() {
    var CreateModel = Backbone.Model.extend({
        urlRoot: "/api/createaccount/",

        defaults: {
            username: null,
            password: null,
            email: null,
            first:null,
            last:null,
            dob:null,
            phone:null,
            address: {
            	number: null,
            	street: null,
            	city: null,
            	country: null,
            	zip: null
            }
        }
    });

    return CreateModel;
});
