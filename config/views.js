var minify = require('html-minifier').minify;
var ejs = require('ejs-locals');
var parsing = function(path,options,fn) {
    console.log('running');
    options.locals = options.locals || {};
    options.locals._layoutFile = 'layout.ejs';
    ejs(path, options, function(err, str){xxwxw
      str = minify(str,{collapseWhitespace: true, removeComments: true});
      return fn(err, str);
    });

};

module.exports.views = {
  engine: {
    ext: 'ejs',
    fn: parsing
  },
  layout: false
};