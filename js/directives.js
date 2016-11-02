/*  Title: directive
    Author:  Hubbert
    Date: Aug 16 2016
    Comment:  
        All directive should be place here.
*/
app.directive('autoSaveForm', ["$timeout", function($timeout) {
    return {
        require: ['^form'],
        link: function($scope, $element, $attrs, $ctrls) {
            var $formCtrl = $ctrls[0];
            var savePromise = null;
            var expression = $attrs.autoSaveForm || 'true';
            $scope.$watch(function() {
                if ($formCtrl.$valid && $formCtrl.$dirty) {
                    if (savePromise) {
                        $timeout.cancel(savePromise);
                    }
                    savePromise = $timeout(function() {
                        savePromise = null;
                        // Still valid?
                        if ($formCtrl.$valid) {
                            if ($scope.$eval(expression) !== false) {
                                $formCtrl.$setPristine();
                            }
                        }
                    }, 1000);
                }
            });
        }
    };
}]);
