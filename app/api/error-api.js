"use strict";
// Only other api's or controllers should be calling the error-api to generate a json error;

/*
Error json example
------------------
{
    error: [{
        language: en, // we should let teh user know this is a english error;
        code: 1001, //code from the database;
        msg: Invalid Google API key supplied //msg from the database;
    }]
}


200 – OK – Everything is working
201 – OK – New resource has been created
204 – OK – The resource was successfully deleted
304 – Not Modified – The client can use cached data
400 – Bad Request – The request was invalid or cannot be served. The exact error should be explained in the error payload. E.g. „The JSON is not valid“
401 – Unauthorized – The request requires an user authentication
403 – Forbidden – The server understood the request, but is refusing it or the access is not allowed.
404 – Not found – There is no resource behind the URI.
422 – Unprocessable Entity – Should be used if the server cannot process the entity, e.g. if an image cannot be formatted or mandatory fields are missing in the payload.
500 – Internal Server Error – API developers should avoid this error. If an error occurs in the global catch blog, the stracktrace should be logged and not returned as response.

------------------
*/

//temp list of errors;
var errorList = {
    1001: {
        msg: 'Invaild username/password.'
    },

    1002: {
        msg: 'Username does not exists in the systems.'
    },

    1003: {
        msg: 'Api call does not exist.'
    },

    1004: {
        msg: 'Incorrect data.'
    }

}

function errorApi() {
    this.tag = 'error-api';

    this.errorObject = function(msg) {
        this.language = "en";
        this.code = null;
        this.msg = msg || "Unknown";
    }

    this.sendError = function(errorNum, status, res) {
        var eo = new this.errorObject();
        eo.code = errorNum;

        if (errorList[errorNum]) {
            eo.msg = errorList[errorNum].msg;
            res.status(status).json({
                error: [eo],
                success: false
            });
        } else {
            res.status(status).json({
                error: [eo],
                success: false
            });
        }
    }

    this.setErrorWithMessage = function(msg, status, res) {
        var eo = new this.errorObject(msg);
        res.status(status).json({
            error: [eo],
            success: false
        });
    }

    this.getError = function(msg){
        var eo = new this.errorObject();
        if(msg){
           eo.msg = msg; 
        }
        return eo;
    }
}

module.exports = errorApi;
