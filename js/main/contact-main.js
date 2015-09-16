define(
    ["../modules/contact/models/contact-model",
        "../modules/contact/views/contact-view"
    ],
    function(Model,
        ContactView) {
        var title = 'contact';
        Counter.Navigation.set(title);

        Counter.showLoader(true);
        var contactView = new ContactView({
            model: new Model()
        });

        $('.counter-page-header').first().append(contactView.render().$el);
        
        Counter.showLoader(false);
    });
