 "use strict"; //Defines that JavaScript code should be executed in "strict mode".
 var express = require('express');
 var routerWeb = express.Router();

 //REST Routes
 routerWeb.all('/v2/contacts', function(req, res) {
     getController('contacts-controller').init(req, res);
 });


 // Web Routes
 routerWeb.get('/', function(req, res) {
     res.render('pages/home', {});
 });

 routerWeb.get('/home', function(req, res) {
     res.render('pages/home', {});
 });

 routerWeb.get('/about-us', function(req, res) {
     res.render('pages/about-us', {});
 });

 routerWeb.get('/api-system', function(req, res) {
     res.render('pages/api', {});
 });

 routerWeb.get('/*', function(req, res, next) {
     res.redirect('/');
 });

 module.exports = routerWeb;
