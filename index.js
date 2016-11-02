"use strict";

// ------------------ GLOBAL Setup
// Setup the configuration
GLOBAL.mix = require('mix-into');
try {
    var local_config = require('./config/local_config');
    global.config = mix(require('./config/master_config'))
        .into(require('./config/local_config'));
} catch (err) {
    console.error('No local configurations found in config/ Error=' + JSON.stringify(err));
    global.config = require('./config/master_config');
}



GLOBAL.dirBase = process.env.PWD;
GLOBAL.BASE_URL = 'http://' + config['server'].ip + ':' + config['server'].port + '/';
GLOBAL.CONTROLLER_DIR = dirBase + '/app/controllers/';
GLOBAL.API_DIR = dirBase + '/app/api/';
GLOBAL.BASE_DIR = dirBase + '/app/base/';

global.getPromise = function() {
    return require('bluebird');
}


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

console.log('Running project in ' + config['env'] + ' mode.');

var express = require('express');
var forceSSL = require('force-ssl-heroku');
var expressLayouts = require('express-ejs-layouts');
var app = express();
var bodyParser = require('body-parser');
var routerWeb = require('./app/corp-router');

app.use(express.static(__dirname));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('port', config.server.port);
// defaults to 'html_corp' if not defined in the render();
app.set('layout', 'layouts/html_corp');

app.use(expressLayouts);
// redirect http to https
if (config['env'] === 'production') {
    app.use(forceSSL);
}

routerWeb.setup(app);


var launchApp = function() {
    app.listen(app.get('port'), function() {
        console.info('Visit http://127.0.0.1:' + app.get('port') + ' to start application.');
    });
}

var grunt = require("grunt");
if (config['env'] === 'production') {
    console.info('Creating the build, please wait...');
    grunt.cli({
        gruntfile: __dirname + "/grunt_pro.js",
        extra: {
            key: "run"
        }
    }, function() {
        launchApp();
    });
} else {
    console.info('Bypassing build we are in ' + config['env'] + ', please wait...');
    grunt.cli({
        gruntfile: __dirname + "/grunt_dev.js",
        extra: {
            key: "run"
        }
    }, function() {
        launchApp();
    });
}
