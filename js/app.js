/*  Title: application bootstrap
    Author:  Hubbert
    Date: Nov 2 2016
    Comment:  
        To start the applicaiton and setup the router if needed.
        Filter should be placed here and other comment app related stuff.
*/

app = angular.module('CounterDraft', [])
    .config(['$locationProvider', function($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);
