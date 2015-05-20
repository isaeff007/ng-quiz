/**
 * Created by ak on 19.05.2015.
 */
angular.module('quizApp')
    .controller('quizBasicController',['$scope', 'quizBasicFactory',
    function ($scope, quizBasicFactory  ) {

        $scope.testValue='YES';
        $scope.factoryValue=1;

    }]);
