"use strict";

if (typeof angular != 'undefined') {
    angular.module('app-counterdraft', []);

    //Common Directives;
    angular.module('app-counterdraft').directive('message', [function() {
            return {
                restrict: 'E',
                scope: true,
                link: function(s, element, attr) {

                    s.hideMessage = true;
                    s.message = "";

                    s.setMessage = function(msg, type) {
                        element.removeClass('alert-success alert-info alert-warning alert-danger');
                        switch (type) {
                            case 'success':
                                element.addClass('alert-success');
                                break;
                            case 'info':
                                element.addClass('alert-info');
                                break;
                            case 'warning':
                                element.addClass('alert-warning');
                                break;
                            case 'danger':
                                element.addClass('alert-danger');
                                break;
                            default:
                                element.addClass('alert-info');
                                break;
                        }
                        s.message = msg;
                        s.hideMessage = false;
                    }

                    s.clearMessage = function() {
                        s.message = ""
                        element.removeClass('alert-success alert-info alert-warning alert-danger');
                    }

                    s.dismissAlert = function() {
                        s.hideMessage = true;
                        s.clearMessage();
                    }
                },
                template: '<span>{{message}}</span><button type="button" class="close btn-modal model-secondary" ng-click="dismissAlert()">&times;</button>'
            }
        }])
        .directive('stringToNumber', [function() {
            return {
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel) {
                    ngModel.$parsers.push(function(value) {
                        return '' + value;
                    });
                    ngModel.$formatters.push(function(value) {
                        return parseFloat(value, 10);
                    });
                }
            }
        }]);

    //Common Services & factories;
    angular.module('app-counterdraft').service('counterDraft-message-srv', [function() {
        var mScope = null;

        this.setElement = function(el) {
            mScope = angular.element(el).scope();
        }
        this.sendMessage = function(msg, type) {
            if (!mScope) {
                console.error('Element not set for counterDraft-message-srv, please run the setElement() function.');
                return;
            }
            mScope.setMessage(msg, type);
        }
        this.dismissAlert = function() {
            if (!mScope) {
                console.error('Element not set for counterDraft-message-srv, please run the setElement() function.');
                return;
            }
            mScope.dismissAlert();
        }
    }]);
} else {
    console.error('Failed to load application.');
}


//common object;
window.counterDraft = {
    'send', 'event', 'Navbar', 'home', 'our_api'
    googleAnalytics:{
        ga: function(action, typeOfAction, element, page, name){
            return false;
        }
    }

}
