"use restrict"; // restrict mode for JavaScript
Counter = {
    Navigation: {
        set: function(title) {
            $('ul.navbar-nav li').removeClass('active');
            $('ul.navbar-nav li.' + title + '-nav').addClass('active');
            //add other navgation items if needed.
        }

    }
}

ga = function() {
    console.log('loaded' + arguments);
}
