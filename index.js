"use strict";

// ------------------ GLOBAL Setup
GLOBAL.config = require('./config/environment-settings');

GLOBAL.mix = require('mix-into');

GLOBAL.dirBase = process.env.PWD;
GLOBAL.BASE_URL = 'http://' + config.get('server').ip + ':' + config.get('server').port + '/';
GLOBAL.CONTROLLER_DIR = dirBase + '/app/controllers/';
GLOBAL.API_DIR = dirBase + '/app/api/';
GLOBAL.BASE_DIR = dirBase + '/app/base/';

GLOBAL.Promise = require('bluebird');
GLOBAL.Unirest = require('unirest');


GLOBAL.getController = function(controllerName) {
    var Controller = require(GLOBAL.CONTROLLER_DIR + controllerName);
    return mix(new Controller()).into(getBase('counter-controller'));
}

GLOBAL.getApi = function(apiName) {
    var api = require(GLOBAL.API_DIR + apiName);
    return mix(new api()).into(getBase('counter-api'));
}

GLOBAL.getBase = function(base) {
    var baseController = require(GLOBAL.BASE_DIR + base);
    return new baseController();
}

// --------------------- End

console.log('Running project in ' + config.get('env') + ' mode.');

var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var npm = require("npm");
var app = express();
var bodyParser = require('body-parser');

var router = require('./app/corp-router');


var launchApp = function() {
    app.use(express.static(__dirname));

    app.use(bodyParser.json()); // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
        extended: true
    }));

    // views is directory for all template files
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');

    // defaults to 'html_corp' if not defined in the render();
    app.set('layout', 'layouts/html_corp');

    //Pass in common Environmental Variables.
    app.settings.config = config;
    app.set('env', config.get('env'));
    app.set('port', config.get('server').port);
    app.set('package_name', config.get('package_name'));
    app.set('web_app', config.get('web_app'));

    app.use(expressLayouts);

    // redirect http to https
     if(config.get('env') === 'production') {
         app.get('*', function(req, res, next) {
            if(!req.connection.encrypted){
                res.redirect('https://' + req.headers.host + req.url)
            }else{
                return next();
            }
         });
     }

    // Adding web routes;
    app.use('', router);
    // app.use(cors);

    app.listen(app.get('port'), function() {
        console.info('Visit http://127.0.0.1:' + app.get('port') + ' to start application.');
    });
}

var grunt = require("grunt");
if (config.get('env') === 'production') {
    console.info('Creating the build, please wait...');
    grunt.cli({
        gruntfile: __dirname + "/gProd.js",
        extra: {
            key: "run"
        }
    }, function() {
        launchApp();
    });
} else {
    console.info('Bypassing build we are in ' + config.get('env') + ', please wait...');
    grunt.cli({
        gruntfile: __dirname + "/gDev.js",
        extra: {
            key: "run"
        }
    }, function(){
        launchApp();
    });
}
