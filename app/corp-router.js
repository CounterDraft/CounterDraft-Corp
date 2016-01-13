 "use strict"; //Defines that JavaScript code should be executed in "strict mode".
 var express = require('express');
 var routerWeb = express.Router();

 // routerWeb.use(function timeLog(req, res, next) {
 //     // res.locals.isAuthorized = false;
 //     res.locals.env = process.env.MODE;
 //     res.locals.package_name = process.env.npm_package_name;
 //     res.locals.web_app = process.env.web_app;
 //     next();
 // });

 // data - should be information we gather from the api's
 routerWeb.get('/', function(req, res) {
     res.render('pages/home', {});
 });

 routerWeb.get('/home', function(req, res) {
     // res.locals.isAuthorized = isAuthorized();
     res.render('pages/home', {});
 });

 routerWeb.get('/*', function(req, res, next) {
     res.redirect('/');
 });

//REST Routers
 routerWeb.all('/v2/contacts', function(req, res) {
     getController('contacts-controller').init(req, res);
 });

 module.exports = routerWeb;
