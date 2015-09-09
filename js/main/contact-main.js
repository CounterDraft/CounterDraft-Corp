define(
    ["modules/contact/models/contact-model",
        "modules/contact/views/contact-view"
    ],
    function(Model,
        ContactView) {
        var title = 'contact';
        console.log('contact-main section');
        Counter.Navigation.set(title);

        var contactView = new ContactView({
        	model: new Model()
        });

        console.log('here');

        $('counter-page-header:first-child').append(contactView.render().$el);


    });
