"use strict";

angular.module('app-counterdraft')
    .controller('homeController', ['$http', '$timeout', 'counterDraft-message-srv', function($http, $timeout, messageService) {
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

            self.user['name'] = self.user.first_name + " " + self.user.last_name;
            self.user.address['postal_code'] = self.user.address['postal_code'].toString(); 

            console.log(self.user);

            var outPutData = {
                "data": self.user
            };

            var testData = {
                "data": {
                    "contact_id": 1,
                    "name": "JJ Johnson",
                    "first_name": "JJ",
                    "last_name": "Johnson",
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
                        "contractor",
                        "early-adopter"
                    ],
                    "custom_fields": {
                        "referral_website": "http://www.example.com"
                    }
                }
            }

            $http({
                method: 'POST',
                url: '/v2/contacts',
                data: outPutData
            }).then(function successCallback(res) {
                messageService.setElement(document.querySelector('message'));
                messageService.sendMessage('Thank you for signing up for the CounterDraft newsletter.', 'success');

                $timeout(function() {
                    dismissModal();
                }, 3000);

            }, function errorCallback(res) {
                messageService.setElement(document.querySelector('message'));
                console.log(JSON.stringify(res));
                if (res.data.error && res.data.error.length > 0) {
                    messageService.sendMessage(res.data.error[0].msg, 'danger');
                } else {
                    messageService.sendMessage('We failed to save your information, please try again.', 'danger');
                }
            });

            return false;
        }

    }]);
