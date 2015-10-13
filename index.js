console.log('Running Project....');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var npm = require("npm");
var app = express();
var router = require('./app/router');


var launchApp = function() {
    app.set('port', (process.env.PORT || 8080));

    app.use(express.static(__dirname));

    // views is directory for all template files
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');

    // defaults to 'html_corp' if not defined in the render();
    app.set('layout', 'layouts/html_corp');

    //Pass in Environmental Variables.
    if (process.env) {
        app.settings.env = process.env.MODE;
        app.settings.package_name = process.env.npm_package_name;
        app.settings.web_app = process.env.web_app;
    }

    app.use(expressLayouts);

    //Adding web routes;
    app.use('', router);
    // app.use(cors);

    app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'));
    });
}


if (process.env.MODE === 'production') {
    console.log('Creating the build, please wait...');
    var grunt = require("grunt");
    grunt.cli({
        gruntfile: __dirname + "/Gruntfile.js",
        extra: {
            key: "run"
        }
    }, function() {
        //callback;
        launchApp();
    });
} else {
    console.log('Bypassing build we are in ' + process.env.MODE + ' please wait...');
    launchApp();
}

// var buildRun = function() {
//     var grunt = require('grunt');
//     console.log('Running build, please wait...');
//     grunt.tasks('default');
// }

// console.log('Updateing packages, please wait...');
// npm.load({
//     "dev": true
// }, function(err) {
//     // catch errors
//     npm.commands.install(function(er, data) {
//         if (er) {
//             console.log('Failed to update packages ' + er);
//         }

//         if (process.env.MODE === 'development') {
//             loadServer();
//         } else if (process.env.MODE === 'production') {
//             loadServer();
//         } else {
//             console.log('MODE not set, ex. MODE=development or MODE=production');
//             console.log('Running in development mode.');
//             loadServer();
//         }

//     });
//     npm.on("log", function(message) {
//         console.log(message);
//     });
// });
