var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// defaults to 'html_corp' if not defined in the render();
app.set('layout', 'layouts/html_corp'); 

app.use(expressLayouts);

app.get('/', function(request, response) {
    response.render('pages/home');
}).get('/about', function(request, response) {
    response.render('pages/about');
}).get('/meet-the-team', function(request, response) {
    response.render('pages/meet-the-team');
}).get('/contact', function(request, response) {
    response.render('pages/contact');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
