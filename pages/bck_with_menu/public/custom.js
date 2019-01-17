/**
 * Created by gerard on 14/08/15.
 */
(function () {
    'use strict';

    console.log("Loaded custom controller... waiting to be used :: withMenu");

    angular.module('injectorApp')
        .controller('withMenu', ['$scope', '$routeParams', function ($scope, $routeParams) {
            $scope.var = "Backoffice without menu :) " + $routeParams.variable;
        }])
})();