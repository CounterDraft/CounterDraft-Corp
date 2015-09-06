console.log('Running Project....');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var npm = require("npm");
var app = express();


var loadServer = function() {
    app.set('port', (process.env.PORT || 5000));

    app.use(express.static(__dirname));

    // views is directory for all template files
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');

    // defaults to 'html_corp' if not defined in the render();
    app.set('layout', 'layouts/html_corp');
    
    //Pass in Environmental Variables.
    if(process.env){
        app.settings.env = process.env.MODE;
    }

    app.use(expressLayouts);

    app.get('/', function(request, response) {
        response.render('pages/home');
    }).get('/about', function(request, response) {
        response.render('pages/about');
    }).get('/meet-the-team', function(request, response) {
        response.render('pages/meet-the-team');
    }).get('/contact', function(request, response) {
        response.render('pages/contact');
    }).get('/faq', function(request, response) {
        response.render('pages/faq');
    });

    app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'));
    });

}

var buildRun = function() {
    var grunt = require('grunt');
    console.log('Running build, please wait...');
    grunt.tasks('default');
}

console.log('Updateing packages, please wait...');
npm.load({
    "dev": true
}, function(err) {
    // catch errors
    npm.commands.install(function(er, data) {
        if (er) {
            console.log('Failed to update packages ' + er);
        }

        if (process.env.MODE === 'development') {
            loadServer();
        } else if (process.env.MODE === 'production') {
            loadServer();
        } else {
            console.log('MODE not set, ex. MODE=development or MODE=production');
            console.log('Running in development mode.');
            loadServer();
        }

    });
    npm.on("log", function(message) {
        console.log(message);
    });
});
