/*  Title: api Controller
    Author:  Hubbert
    Date: Nov 02 2016
    Comment: 
        This should all the logic for the api page.
*/

app.controller('ApiCtrl', ['$scope', '$http', '$window', 'data', function($scope, $http, $window, data) {
    var _url_login = "/api/v1/account/login";
    var _url_registration = "/api/v1/account/registration";
    var _base_templates = "templates/login/";
    var _url_reset = "/api/v1/reset/password";

    $scope.registrationModel = {
        first_name: null,
        last_name: null,
        email_address: null,
        password: null,
        password_confirm: null,
        organization_name: null,
        organization_type: null,
        organization_description: null,
        organization_hash: null
    };

    $scope.loginModel = {
        email_address: null,
        password: null
    };

    $scope.resetModal = {
        email_address: null
    };

    $scope.showResetPassword = null;
    $scope.organization_types = [];

    var _init = function() {
        //default page;
        $scope.currentPage = _getDefaultPage();
    }

    this.initLogin = function() {
        $('body:not(.login-background)').addClass('login-background');
        $scope.showResetPassword = false;
    }

    this.initRegistration = function() {
        if (typeof 'undefined' != data && data.organization_types) {
            $scope.organization_types = data.organization_types;
        }
    }

    var _getDefaultPage = function() {
        return _base_templates + 'login.html';
    }

    $scope.onRoute = function(page) {
        $('body').removeClass('login-background');
        if (page) {
            $scope.currentPage = _base_templates + page + '.html';
        }
        angular.forEach($scope.resetModal, function(value, key) {
            $scope.resetModal[key] = '';
        });
        $scope.showResetPassword = false;
    }

    $scope.onShowReset = function() {
        if ($scope.showResetPassword) {
            $scope.showResetPassword = false;
        } else {
            $scope.showResetPassword = true;
        }
    }

    $scope.onReset = function() {
        var self = this;
        var formData = $scope.resetModal;
        var hasData = true;

        for (var x in formData) {
            if (!formData[x]) {
                hasData = false;
            }
        }

        if (!hasData) {
            $window.swal({
                title: "Error",
                text: 'A email_address is reuqired to reset password',
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "OK",
                closeOnConfirm: true,
                html: true
            });
            return;
        }
        //post call to backend;
        $http({
            method: 'PUT',
            url: _url_reset,
            data: formData,
        }).then(function successCallback(response) {
            var msg = "Please check your email for instructions on reseting your account.";
            var data = response.data;

            $window.swal({
                title: "Success",
                text: msg,
                type: "success",
                confirmButtonColor: "#64d46f",
                confirmButtonText: "OK",
                closeOnConfirm: true,
                html: true
            }, function() {
                $scope.resetModal.email_address = null;
                self.resetPasswordForm.$setPristine();
                self.resetPasswordForm.$setUntouched();
                $scope.$apply();
                $scope.$broadcast('show-errors-reset');
                $scope.onShowReset();
            });

        }, function errorCallback(response) {
            var message = 'An unexpected error has occuried!';

            if (typeof 'undefined' != response &&
                response.hasOwnProperty('data') &&
                response.data.error.length > 0) {
                message = response.data.error[0].msg;
            }
            $window.swal({
                title: "Error",
                text: message,
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "OK",
                closeOnConfirm: true,
                html: true
            });
        });
    }

    $scope.onRegistration = function() {
        var formData = $scope.registrationModel;
        var errorMessage = [];
        if (!formData) {
            errorMessage.push("No data submitted");
        } else if (!formData.first_name) {
            errorMessage.push("First name is required");
        } else if (!formData.last_name) {
            errorMessage.push("Last name is required");
        } else if (!formData.email_address) {
            errorMessage.push("Email address is required");
        } else if (!formData.last_name) {
            errorMessage.push("Last name is required");
        } else if (!formData.password) {
            errorMessage.push("Password is required");
        } else if (formData.password != formData.password_confirm) {
            errorMessage.push("Password does not match password confirmation");
        } else if (!formData.organization_name && !formData.organization_type && !formData.organization_hash) {
            errorMessage.push("Organization name and type Or Oranization invite must be entered.");
        } else if (!formData.organization_hash && !formData.organization_type && formData.organization_name) {
            errorMessage.push("Organization type must be selected");
        } else if (!formData.organization_hash && formData.organization_type && !formData.organization_name) {
            errorMessage.push("Organization name must be entered");
        }

        if (errorMessage.length > 0) {
            $window.swal({
                title: "Error",
                text: errorMessage,
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "OK",
                closeOnConfirm: true,
                html: true
            });
            return;
        }

        //post call to backend;
        $http({
            method: 'POST',
            url: _url_registration,
            data: formData,
        }).then(function successCallback(response) {
            $window.location.href = '/dashboard';
        }, function errorCallback(response) {
            var data = response.data || null;
            if (data && data.error.length > 0) {
                var error = data.error[0];
                $window.swal({
                    title: "Error",
                    text: error.msg,
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    closeOnConfirm: true,
                    html: true
                }, function() {
                    //callback
                });
            }
        });
    }

    $scope.onClose = function() {
        $scope.currentPage = _getDefaultPage();
        angular.forEach($scope.registrationModel, function(value, key) {
            $scope.registrationModel[key] = '';
        });
    }

    $scope.onSubmit = function() {
        var formData = $scope.loginModel;
        if (!formData) {
            return "Error: no data submitted";
        } else if (!formData.email_address) {
            return "Error: Username is required!";
        } else if (!formData.password) {
            return "Error: Username is password!";
        } else {
            //post call to backend;
            $http({
                method: 'POST',
                url: _url_login,
                data: formData,
            }).then(function successCallback(response) {
                $window.location.href = '/dashboard';
            }, function errorCallback(response) {
                var data = response.data || null;
                if (data && data.error.length > 0) {
                    var error = data.error[0];
                    $window.swal({
                        title: "Error",
                        text: error.msg,
                        type: "error",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "OK",
                        closeOnConfirm: true,
                        html: true
                    }, function() {
                        //callback
                    });
                }

            });
        }
    }

    _init();

}]);
