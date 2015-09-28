 "use strict"; //Defines that JavaScript code should be executed in "strict mode".
 var express = require('express');
 var routerWeb = express.Router();
 var http = require('http');

 //routers, so we can see them easier;
 var routers = {
     'about': '/about',
     'mtt': '/meet-the-team',
     'cu': '/contact-us',
     'tof': '/terms-of-service',
     'legal': '/legal',
     'careers': '/careers',
     'faq': '/faq',
     'ca': '/create-account',
     'forgot': '/forgot',
     'default': '/*'
 }

 var isAuthorized = function(cb) {
    var option = {

    }
    //make a call to backend to see if we are logged in
    // get /api/login;
    console.log(process.env.app_api);


 }

 routerWeb.use(function timeLog(req, res, next) {
    res.locals.isAuthorized = false;
    // res.locals.isAuth = false;
    // isAuthorized(function(auth){
    //     self.res.locals.isAuth = auth;
    //     self.next();
    // });

    next();
 });

 // data - should be information we gather from the api's
 routerWeb.get('/', function(req, res) {
     res.render('pages/home');
 });
 routerWeb.get(routers['about'], function(req, res) {
     res.render('pages/about');
 });
 routerWeb.get(routers['mtt'], function(req, res) {
     res.render('pages/meet-the-team');
 });
 routerWeb.get(routers['cu'], function(req, res) {
     res.render('pages/contact-us');
 });
 routerWeb.get(routers['tof'], function(req, res) {
     res.render('pages/terms-of-service');
 });
 routerWeb.get(routers['legal'], function(req, res) {
     res.render('pages/legal');
 });
 routerWeb.get(routers['careers'], function(req, res) {
     res.render('pages/careers');
 });
 routerWeb.get(routers['faq'], function(req, res) {
     res.render('pages/faq');
 });
 routerWeb.get(routers['ca'], function(req, res) {
     res.render('pages/create-account');
 });
 routerWeb.get(routers['forgot'], function(req, res) {
     res.render('pages/forgot');
 });
 routerWeb.get(routers['default'], function(req, res) {
     res.redirect('/');
 });


 module.exports = routerWeb;
