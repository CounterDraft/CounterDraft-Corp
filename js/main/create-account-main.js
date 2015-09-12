define(["../modules/create/models/create-model",
    "../modules/create/views/create-account-view"
], function(Model,
    CreateAccountView) {
    var title = 'create';
    Counter.Navigation.set(title);

    var createModel = new Model({});

    var createAccountView = new CreateAccountView({
    	model: createModel,
    	el: $('.create-account-container')
    }).render();



});
