"use strict";

angular.module('app-counterdraft')
    .controller('homeController', ['$http', 'counterDraft-message-srv', function($http, messageService) {
        var self = this;

        var msgElement = document.querySelector('message');

        self.isModel = false;
        self.user = {};
        self.NewsletterModel = "/views/templates/home/modal/newsletter-modal.html"

        var dismissModal = function() {
            $('#newsletter-modal').modal('hide');
            self.isModel = false;
            self.user = {};
        }

        self.showDialog = function() {
            self.isModel = true;
            return false;
        }
        self.nwSubmit = function() {

            var testData = {
                "items": [{
                    "data": {
                        "id": 1,
                        "creator_id": 1,
                        "owner_id": 1,
                        "is_organization": true,
                        "contact_id": null,
                        "name": "Design Services Company",
                        "first_name": null,
                        "last_name": null,
                        "customer_status": "none",
                        "prospect_status": "none",
                        "title": null,
                        "description": null,
                        "industry": "Design Services",
                        "website": "http://www.designservice.com",
                        "email": null,
                        "phone": null,
                        "mobile": null,
                        "fax": "+44-208-1234567",
                        "twitter": null,
                        "facebook": null,
                        "linkedin": null,
                        "skype": null,
                        "address": {
                            "line1": "2726 Smith Street",
                            "city": "Hyannis",
                            "postal_code": "02601",
                            "state": "MA",
                            "country": "US"
                        },
                        "tags": [
                            "important"
                        ],
                        "custom_fields": {
                            "known_via": "tom"
                        },
                        "created_at": "2014-08-27T16:32:56Z",
                        "updated_at": "2014-08-27T16:32:56Z"
                    },
                    "meta": {
                        "type": "contact"
                    }
                }, {
                    "data": {
                        "id": 2,
                        "creator_id": 1,
                        "owner_id": 1,
                        "is_organization": false,
                        "contact_id": 1,
                        "name": "Mark Johnson",
                        "first_name": "Mark",
                        "last_name": "Johnson",
                        "customer_status": "none",
                        "prospect_status": "none",
                        "title": "CEO",
                        "description": "I know him via Tom",
                        "industry": "Design Services",
                        "website": "http://www.designservice.com",
                        "email": "mark@designservices.com",
                        "phone": "508-778-6516",
                        "mobile": "508-778-6516",
                        "fax": "+44-208-1234567",
                        "twitter": "mjohnson",
                        "facebook": "mjohnson",
                        "linkedin": "mjohnson",
                        "skype": "mjohnson",
                        "address": {
                            "line1": "2726 Smith Street",
                            "city": "Hyannis",
                            "postal_code": "02601",
                            "state": "MA",
                            "country": "US"
                        },
                        "tags": [
                            "important"
                        ],
                        "custom_fields": {
                            "known_via": "tom"
                        },
                        "created_at": "2014-08-27T16:32:56Z",
                        "updated_at": "2014-08-27T16:32:56Z"
                    },
                    "meta": {
                        "type": "contact"
                    }
                }],
                "meta": {
                    "type": "collection",
                    "count": 2,
                    "links": {
                        "self": "http://api.getbase.com/v2/contacts"
                    }
                }
            }


            $http({
                method: 'POST',
                url: '/v2/contacts',
                data: self.user
            }).then(function successCallback(res) {
                messageService.setElement(document.querySelector('message'));
                console.log(JSON.stringify(res));
                dismissModal();
            }, function errorCallback(res) {
                messageService.setElement(document.querySelector('message'));
                console.log(JSON.stringify(res));
                if(res.data.error && res.data.error.length > 0){
                    messageService.sendMessage(res.data.error[0].msg, 'danger');
                }else{
                    messageService.sendMessage('We failed to save your information, please try again.', 'danger');
                }
            });

            return false;
        }

    }]);
