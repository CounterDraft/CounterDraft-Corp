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

            //conditions data;
            self.user['name'] = self.user.first_name + " " + self.user.last_name;
            self.user.address['postal_code'] = self.user.address['postal_code'].toString(); 
            var odata = {
                "data": self.user
            }

            $http({
                method: 'POST',
                url: '/v2/contacts',
                data: odata
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
