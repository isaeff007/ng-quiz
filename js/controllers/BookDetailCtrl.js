/**
 * Created by ak on 19.05.2015.
 */
BookDetailCtrl.$inject = ['$routeParams', '$location', 'QUIZCONSTANTS', 'dataFactory'];

function BookDetailCtrl ($routeParams, $location, QUIZCONSTANTS,  dataFactory  ) {
    var ctrl = this;

    ctrl.constants = QUIZCONSTANTS;
    //'/books/:bookID' All variables defined with the : notation are extracted into the $routeParams object.
    ctrl.bookID = $routeParams.bookID;
    ctrl.title = null; // quiz title
    ctrl.quiz = []; // quiz questions is an array because
    ctrl.results = []; // user results
    ctrl.readstatus = 33;
    ctrl.pointsEarned =0;
    ctrl.pointsToEarn=0;

    function BookResult(){
        this.bookID=ctrl.bookID;
        this.pointsToEarn=ctrl.pointsToEarn;
        this.pointsEarned=ctrl.pointsEarned;
    }

    //functions as bindable members
    ctrl.checkUserChoice = checkUserChoice;
    ctrl.closeAlert = closeAlert;
    ctrl.checkQuizCompleted = checkQuizCompleted;
    ctrl.updateResult = updateResult;


    dataFactory.getBook(ctrl.bookID).success(function(data, status) {
        //the data should consist of 1 array element (quiz for the selected book)
        ctrl.readstatus=status;
        if (data.length == 1) {
            ctrl.title = data[0].name;
            ctrl.quiz = data[0].questions;
            createResults();
        }else{
            ctrl.title = "No book is found";
        }
    }).
        error(function(data, status) {
            // status 404
            ctrl.readstatus = status;
        });

    //prepare array of results objects according to question structure
    function createResults (){
        var len = ctrl.quiz.length;
        for (var i = 0; i < len; i++){
            ctrl.results.push({
                _id:      ctrl.quiz[i]._id,
                answer :  ctrl.quiz[i].answer, //the correct answer!
                //the fields are set later in checkUserChoice
                userChoice: null,
                correct : null,
                //init with 0 (otherwise with ctrl.quiz[i-1].points;
                points : 0
            });
            ctrl.pointsToEarn+=ctrl.quiz[i].points;
        }
    }

    //assign and check user choice (accessible from html)

    function checkUserChoice(questionid , userChoice ){
        console.log('QuestionID '+questionid);
        ctrl.results[questionid-1].userChoice = userChoice;
        //check the userChoice against the correct answer
        if (ctrl.results[questionid-1].answer === userChoice){
            ctrl.results[questionid-1].correct = ctrl.constants.CORRECT;
            ctrl.pointsEarned += ctrl.quiz[questionid-1].points;
            ctrl.results[questionid-1].points = ctrl.quiz[questionid-1].points;
        }else{
            ctrl.results[questionid-1].correct=ctrl.constants.INCORRECT;
            //decrement the number of earned points only if the current answer was reselected
            if (ctrl.results[questionid-1].points>0) {
                ctrl.pointsEarned -= ctrl.quiz[questionid - 1].points;
            }
            //set the point to zero if not correct
            ctrl.results[questionid-1].points=0;
        }
    }

    ctrl.alerts=[];

    function closeAlert(index) {
        ctrl.alerts.splice(index, 1);
    }



    //only show results if all questions are answered
    function checkQuizCompleted(){
        var len = ctrl.quiz.length;
        for(var i = 0; i<len;i++){
            if (ctrl.results[i].userChoice === null){
                ctrl.alerts=[
                    { type: 'danger', msg: QUIZCONSTANTS.NOTCOMPLETE }
                ];
                return true;
            }
        }
        //ctrl.alerts=[
        //    { type: 'success', msg: " "+ctrl.pointsEarned +QUIZCONSTANTS.GOTPOINTS2+ctrl.pointsToEarn+QUIZCONSTANTS.GOTPOINTS3  }
        //];
        ctrl.alerts=[];
        return false; //all radio are checked

    }

    //reload page
    ctrl.reloadQuiz = function(){
        location.reload();
    };

    //back to book list
    ctrl.cancel = function () {
        $location.path("books/");
    };

    //update result for current book
   function updateResult() {
        var bookResult = new BookResult();
        if (bookResult.pointsEarned > 0 && bookResult.pointsToEarn > 0){
            dataFactory.updateBookResults(new BookResult());
        } else{
            console.log("no book result availiable for "+bookResult.bookID);
        }
    }

}

quizApp .controller('BookDetailCtrl', BookDetailCtrl);




