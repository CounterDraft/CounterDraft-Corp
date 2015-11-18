 "use strict"; //Defines that JavaScript code should be executed in "strict mode".
 var express = require('express');
 var routerWeb = express.Router();

 //routers, so we can see them easier;
 var routers = {
     'home': '/home',
     'default': '/*'
 }

 routerWeb.use(function timeLog(req, res, next) {
     // res.locals.isAuthorized = false;
     res.locals.MODE = process.env.MODE;
     res.locals.package_name = process.env.npm_package_name;
     res.locals.web_app = process.env.web_app;
     next();
 });

 // data - should be information we gather from the api's
 routerWeb.get('/', function(req, res) {
     res.render('pages/home', {});
 });
 routerWeb.get(routers['home'], function(req, res) {
     // res.locals.isAuthorized = isAuthorized();
     res.render('pages/home', {});
 });
 routerWeb.get(routers['default'], function(req, res, next) {
         res.redirect('/');
 });

 module.exports = routerWeb;
