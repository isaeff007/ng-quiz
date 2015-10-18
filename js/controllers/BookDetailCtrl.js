/**
 * Created by ak on 19.05.2015.
 */

quizApp
    .controller('BookDetailCtrl',['$scope','$routeParams','QUIZCONSTANTS', 'dataFactory',
        function ($scope, $routeParams, QUIZCONSTANTS,  dataFactory  ) {

            $scope.constants = QUIZCONSTANTS;
            //'/books/:bookID' All variables defined with the : notation are extracted into the $routeParams object.
            $scope.bookID = $routeParams.bookID;
            $scope.title = null; // quiz title
            $scope.quiz = []; // quiz questions is an array because
            $scope.results = []; // user results
            $scope.readstatus = 33;
            $scope.pointsEarned =0;
            $scope.pointsToEarn=0;

            dataFactory.getBook($scope.bookID).success(function(data, status) {
                //status 200
                //the data should consist of 1 array element (quiz for the selected book)
                $scope.readstatus=status;
                if (data.length == 1) {
                    $scope.title = data[0].name;
                    $scope.quiz = data[0].questions;
                    createResults();
                }else{
                    $scope.title = "No book is found";
                }
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
                        //init with 0 (otherwise with $scope.quiz[i-1].points;
                        points : 0
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
                    $scope.pointsEarned += $scope.quiz[questionid-1].points;
                    $scope.results[questionid-1].points = $scope.quiz[questionid-1].points;
                }else{
                    $scope.results[questionid-1].correct=$scope.constants.INCORRECT;
                    //decrement the number of earned points only if the current answer was reselected
                    if ($scope.results[questionid-1].points>0) {
                        $scope.pointsEarned -= $scope.quiz[questionid - 1].points;
                    }
                    //set the point to zero if not correct
                    $scope.results[questionid-1].points=0;
                }
            };

            $scope.alerts=[];
            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };



            //only show results if all questions are answered
            $scope.checkQuizCompleted = function(){
                var len = $scope.quiz.length;
                for(var i = 0; i<len;i++){
                    if ($scope.results[i].userChoice === null){
                        $scope.alerts=[
                            { type: 'danger', msg: QUIZCONSTANTS.NOTCOMPLETE }
                        ];
                        return true;
                    }
                }
                //$scope.alerts=[
                //    { type: 'success', msg: " "+$scope.pointsEarned +QUIZCONSTANTS.GOTPOINTS2+$scope.pointsToEarn+QUIZCONSTANTS.GOTPOINTS3  }
                //];
                $scope.alerts=[];
                return false; //all radio are checked

            };

            //reload page
            $scope.reloadQuiz = function(){
                location.reload();
            }

        }]);
