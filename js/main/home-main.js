"use strict";

angular.module('app-counterdraft')
    .controller('homeController', ['$http', function($http) {
        var self = this;
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
            var ifInformationIsSubmitted = true;
            alert("Infomation to be saved - " + JSON.stringify(self.user));

            $http({
                method: 'GET',
                url: '/v2/contacts'
            }).then(function successCallback(res) {
                console.log(res);
            }, function errorCallback(res) {
                console.log('Error: ' + res);
            });


            if (ifInformationIsSubmitted) {
                dismissModal();
            }

            return false;
        }

    }]);
