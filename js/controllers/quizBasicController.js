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
                createResults();
            }).
                error(function(data, status) {
                    // status 404
                    $scope.readstatus = status;
                });

            //prepare array of results objects according to question structure
            createResults = function(){
                var len = $scope.quiz.length;
                for (var i = 0; i < len; i++){
                    $scope.results.push({
                        _id:      $scope.quiz[i]._id,
                        answer :  $scope.quiz[i].answer, //the correct answer!
                        userChoice: null,
                        correct : null
                    });
                    //console.log('result: '+$scope.results[i]._id+' answer: '+$scope.results[i].answer);
                }
            };

            //assign and check user choice
            $scope.checkUserChoice = function(questionid , userChoice ){
                console.log('QuestionID '+questionid);
                $scope.results[questionid-1].userChoice = userChoice;
                //check the userChoice against the correct answer
                if ($scope.results[questionid-1].answer === userChoice){
                    $scope.results[questionid-1].correct='Correct';
                }else{
                    $scope.results[questionid-1].correct='Incorrect';
                }
            };

            //only show results if all questions are answered
            $scope.checkQuizCompleted = function(){
                var len = $scope.quiz.length;
                for(var i = 0; i<len;i++){
                    if ($scope.results[i].userChoice === null){
                        return true;
                    }
                }
                return false; //all radio are checked
            };
        }]);
