"use strict";

//api should return promises;

function BaseApi() {
    this.tag = 'baseApi';

    var BASE_URL = config.base.url;
    var CONTACT_URL = '/v2/contacts';
    var SELF_URL = '/v2/users/self';
    var baseHeader = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': config.base.accessToken
    }

    this.create = function(user) {
        return new Promise(function(resolve, reject) {
            Unirest.post(BASE_URL + CONTACT_URL)
                .header(baseHeader)
                .send(user)
                .end(function(response) {
                    if (response.body && response.body.hasOwnProperty('errors') && response.body.errors.length > 0) {
                        reject(response.body.errors[0].error.message);
                    } else {
                        resolve(response.body);
                    }
                });
        });
    }

    this.retrieve = function(user) {
        return new Promise(function(resolve, reject) {
            Unirest.get(BASE_URL+ SELF_URL)
                .header(baseHeader)
                .send(user)
                .end(function(response) {
                    if (response.body && response.body.hasOwnProperty('errors') && response.body.errors.length > 0) {
                        reject(response.body.errors[0].error.message);
                    } else {
                        resolve(response.body);
                    }
                });
        });
    }
}

module.exports = BaseApi;