"use strict";

// GLOBAL Setup
GLOBAL.config = require('./config/environment-settings');
// End

console.log('Running Project....');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var npm = require("npm");
var app = express();

var router = require('./app/router');


var launchApp = function() {
    app.set('port', config.server.port);

    app.use(express.static(__dirname));

    // views is directory for all template files
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');

    // defaults to 'html_corp' if not defined in the render();
    app.set('layout', 'layouts/html_corp');

    //Pass in Environmental Variables.
    if (process.env) {
        app.settings.env = process.env.env;
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


if (process.env.env === 'production') {
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
    console.log('Bypassing build we are in ' + process.env.env + ' please wait...');
    launchApp();
}
