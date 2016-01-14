"use strict";

// ------------------ GLOBAL Setup
GLOBAL.config = require('./config/environment-settings');

GLOBAL.mix = require('mix-objects');

GLOBAL.dirBase = process.env.PWD;
GLOBAL.BASE_URL = 'http://' + config.server.ip + ':' + config.server.port + '/';
GLOBAL.CONTROLLER_DIR = dirBase + '/app/controllers/';
GLOBAL.API_DIR = dirBase + '/app/api/';
GLOBAL.BASE_DIR = dirBase + '/app/base/';

GLOBAL.Promise = require('bluebird');
GLOBAL.Unirest = require('unirest');


GLOBAL.getController = function(controllerName) {
    var Controller = require(GLOBAL.CONTROLLER_DIR + controllerName);
    return mix(new Controller(), [getBase('counter-controller')]);
}

GLOBAL.getApi = function(apiName) {
    var api = require(GLOBAL.API_DIR + apiName);
    return mix(new api(), [getBase('counter-api')]);
}

GLOBAL.getBase = function(base) {
    var baseController = require(GLOBAL.BASE_DIR + base);
    return new baseController();
}

// --------------------- End

console.log('Running project in ' + config.env + ' mode.');

var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var npm = require("npm");
var app = express();

var router = require('./app/corp-router');


var launchApp = function() {
    app.use(express.static(__dirname));

    // views is directory for all template files
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');

    // defaults to 'html_corp' if not defined in the render();
    app.set('layout', 'layouts/html_corp');

    //Pass in Environmental Variables.
    app.settings.config = config;
    app.set('env', config.env);
    app.set('port', config.server.port);
    app.set('package_name', config.package_name);
    app.set('web_app', config.web_app);

    app.use(expressLayouts);
    // app.use(function(req, res, next) {
    //     res.header('Access-Control-Allow-Credentials', true);
    //     res.header('Access-Control-Allow-Origin', req.headers.origin);
    //     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //     res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    //     next();
    // });

    // Adding web routes;
    app.use('', router);
    // app.use(cors);

    app.listen(app.get('port'), function() {
        console.log('Visit http://127.0.0.1:' + app.get('port') + ' to start application.');
    });
}


if (config.env === 'production') {
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
    console.log('Bypassing build we are in ' + config.env + ', please wait...');
    launchApp();
}
