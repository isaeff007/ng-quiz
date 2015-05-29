/**
 * Created by ak on 19.05.2015.
 */
angular.module('quizApp')
    .controller('quizBasicController',['$scope','QUIZCONSTANTS', 'quizBasicFactory',
        function ($scope, QUIZCONSTANTS,  quizBasicFactory  ) {

            $scope.constants = QUIZCONSTANTS;
            $scope.title = null; // quiz title
            $scope.quiz = {}; // quiz questions
            $scope.results = []; // user results
            $scope.readstatus = 33;
            $scope.pointsEarned =0;
            $scope.pointsToEarn=0;

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
                        //the fields are set later in checkUserChoice
                        userChoice: null,
                        correct : null,
                        points : $scope.quiz[i].points
                    });
                    $scope.pointsToEarn+=$scope.quiz[i].points;
                }
            };

            //assign and check user choice
            $scope.checkUserChoice = function(questionid , userChoice ){
                console.log('QuestionID '+questionid);
                $scope.results[questionid-1].userChoice = userChoice;
                //check the userChoice against the correct answer
                if ($scope.results[questionid-1].answer === userChoice){
                    $scope.results[questionid-1].correct = $scope.constants.CORRECT;
                    $scope.pointsEarned += $scope.results[questionid-1].points
                }else{
                    $scope.results[questionid-1].correct=$scope.constants.INCORRECT;
                    //set the point to zero if not correct
                    $scope.results[questionid-1].points=0;
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
