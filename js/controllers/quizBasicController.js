/**
 * Created by ak on 19.05.2015.
 */
angular.module('quizApp')
    .controller('quizBasicController',['$scope', 'quizBasicFactory',
    function ($scope, quizBasicFactory  ) {

        $scope.testValue='YES';
        $scope.factoryValue=1;

        $scope.title = null; // quiz title
        $scope.quiz = {}; // quiz questions
        $scope.results = []; // user results
        $scope.readstatus = 33;


        quizBasicFactory.success(function(data, status) {
            //status 200
            $scope.readstatus=status;
            $scope.title = data.name;
            $scope.quiz = data.questions;
        }).
        error(function(data, status) {
             // status 404
            $scope.readstatus = status;
        });

    }]);
