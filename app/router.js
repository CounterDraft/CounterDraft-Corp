 "use strict"; //Defines that JavaScript code should be executed in "strict mode".
 var express = require('express');
 var routerWeb = express.Router();
 var unirestFactory = require('./unirestFactory').unirest;

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
     'home': '/home',
     'default': '/*'
 }




 var isAuthorized = function(run) {

     unirestFactory.get(process.env.app_api + 'login')
         .header('Accept', 'application/json')
         .send({})
         .end(function(response) {
             run(response.body);
         });

 }

 routerWeb.use(function timeLog(req, res, next) {
     res.locals.isAuthorized = false;
     res.locals.MODE = process.env.MODE;
     res.locals.package_name = process.env.npm_package_name;
     res.locals.web_app = process.env.web_app;
     next();
 });

 // data - should be information we gather from the api's
 routerWeb.get('/', function(req, res) {
     // isAuthorized(function(body) {
     //      console.log(body);
     //     if (body.user) {
     //         res.locals.isAuthorized = true;
     //     } else {
     //         res.locals.isAuthorized = false;
     //     }
         
     // });
     res.render('pages/home', {});
 });
 routerWeb.get(routers['about'], function(req, res) {
     // res.locals.isAuthorized = isAuthorized();
     res.render('pages/about', {});
 });
 routerWeb.get(routers['mtt'], function(req, res) {
     // res.locals.isAuthorized = isAuthorized();
     res.render('pages/meet-the-team', {});

 });
 routerWeb.get(routers['cu'], function(req, res) {
     // res.locals.isAuthorized = isAuthorized();
     res.render('pages/contact-us', {});

 });
 routerWeb.get(routers['tof'], function(req, res) {
     // res.locals.isAuthorized = isAuthorized();
     res.render('pages/terms-of-service', {});

 });
 routerWeb.get(routers['legal'], function(req, res) {
     // res.locals.isAuthorized = isAuthorized();
     res.render('pages/legal', {});

 });
 routerWeb.get(routers['careers'], function(req, res) {
     // res.locals.isAuthorized = isAuthorized();
     res.render('pages/careers', {});

 });
 routerWeb.get(routers['faq'], function(req, res) {
     // res.locals.isAuthorized = isAuthorized();
     res.render('pages/faq', {});

 });
 routerWeb.get(routers['ca'], function(req, res) {
     // res.locals.isAuthorized = isAuthorized();
     res.render('pages/create-account', {});

 });
 routerWeb.get(routers['forgot'], function(req, res) {
     // res.locals.isAuthorized = isAuthorized();
     res.render('pages/forgot', {});

 });
 routerWeb.get(routers['default'], function(req, res, next) {
     if (req.headers.referer) {
         next();
     } else {
         res.redirect('/');
     }
 });


 module.exports = routerWeb;
