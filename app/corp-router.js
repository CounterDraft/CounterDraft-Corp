"use strict";

module.exports = {

    setup: function(app) {
        var routerWeb = require('express').Router();
        var Promise = getPromise();

        routerWeb.get("/", function(req, res) {
            res.render('pages/home', {data:{}});
        });

        routerWeb.get('/home', function(req, res) {
            res.render('pages/home', {data:{}});
        });

        routerWeb.get('/api-system', function(req, res) {
            res.render('pages/api', {data:{}});
        });

        routerWeb.get('/about-us', function(req, res) {
            res.render('pages/about-us', {data:{}});
        });

        routerWeb.get('/*', function(req, res, next) {
            res.redirect('/');
        });

        //pre-route
        app.use(function(req, res, next) {
            var self = this;
            //defaults variables;
            res.locals.environment = global.config['environment'];
            res.locals.npm_package_name = global.config['npm_package_name'];
            res.locals.web_app = global.config['web_app'];
            next();
        });

        app.use('', routerWeb);
    }
}
