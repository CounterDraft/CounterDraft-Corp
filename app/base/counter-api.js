"use strict";

function BaseApi() {
    this.tag = 'counter-api';

    this.getTag = function() {
        return this.name;
    }

    this.getErrorApi = function() {
        var errorApi = require(GLOBAL.API_DIR + 'error-api');
        return new errorApi();
    }

    this.getVerb = function(req) {
    	console.log('here');
        if (typeof req.method != 'undefined') {
            return req.method;
        }
        return null;
    }
}

module.exports = BaseApi;
