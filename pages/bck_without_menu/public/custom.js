/**
 * Created by gerard on 14/08/15.
 */
(function () {
    'use strict';

    console.log("Loaded custom controller... waiting to be used :: without");

    angular.module('injectorApp')
        .controller('withOutMenu', ['$scope', '$routeParams', function ($scope, $routeParams) {
            console.log('custom controller');
            $scope.var = "This is a test: " + $routeParams.test
        }])
})();