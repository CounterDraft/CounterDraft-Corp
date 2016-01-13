"use strict";

function BaseController() {
    this.tag = 'counter-controller';

    this.getTag = function() {
        return this.name;
    }

    this.getErrorApi = function(){
    	var errorApi = require(GLOBAL.API_DIR + 'error-api');
    	return new errorApi();
    }

    this.rest = function(req, res) {
        logger.debug('determine which call to invoke.');
        if (req && req.params && typeof req.params[0] != 'undefined' && req.params[0] != '' && req.method) {
        	var restCallStr = req.params[0].toLowerCase();
        	//cleans the str if it has a tailing "/";
            if (restCallStr.substr(-1) === '/') {
                restCallStr = restCallStr.substr(0, restCallStr.length - 1);
            }

            if(this.ApiRouter.hasOwnProperty(restCallStr)){
            	var apiRouter = this.ApiRouter[restCallStr];
            	apiRouter(req.method.toLowerCase(), req, res);
            }else{
            	logger.warn(this.tag + 'A error has been generated for return json a error json.');
            }

        } else {
            logger.warn(this.tag + 'A error has been generated for return json a error json.');
        }
        return this;
    }
}

module.exports = BaseController;
