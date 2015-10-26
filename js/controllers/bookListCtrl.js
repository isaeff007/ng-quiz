/**
 * Created by ak on 03.08.2015.
 */
//Controller to represent the list of books
BookListCtrl.$inject =['dataFactory'];


function BookListCtrl(dataFactory){
    ctrl = this;

    ctrl.status;
    ctrl.books;
    ctrl.results=[];
    ctrl.totalResult={pointsEarned:0, pointsToEarn:0, formattedPoints:""};
    ctrl.resultsLoaded=false;

    dataFactory.getBooks().success(function (bookdata, status){
        ctrl.books = bookdata;
        ctrl.status = status;
    })
        .error(function(error){
            ctrl.status='unable to load book list: '+error.message;
        });

    dataFactory.getResults().success(function (resultdata, status){
        ctrl.results = resultdata;
        ctrl.status = status;
        createTotalResult();
        //to wait in the "ng-if" directive avoiding the NPE in getBookResult()
        ctrl.resultsLoaded = true;
    })
        .error(function(error){
            ctrl.status='unable to load results: '+error.message;
        });


    //get the total results (private function)
    function createTotalResult (){
        if (ctrl.results.length>0) {
            for (var key in ctrl.results) {
                if (ctrl.results.hasOwnProperty(key)) {
                    var bookresult = ctrl.results[key];
                    ctrl.totalResult.pointsEarned += bookresult.pointsEarned;
                    ctrl.totalResult.pointsToEarn += bookresult.pointsToEarn;
                }
            }
        }
        ctrl.totalResult.formattedPoints=ctrl.totalResult.pointsEarned + " / " + ctrl.totalResult.pointsToEarn;
    }


    //get the results for selected book iterating over results array
    ctrl.getBookResult = function(bookID) {
        var formattedResult = "---";
        if (ctrl.results.length > 0) {
            for(var idx in ctrl.results){
                if (ctrl.results[idx].bookid == bookID) {
                    formattedResult = ctrl.results[idx].pointsEarned + " / " + ctrl.results[idx].pointsToEarn;
                }
            }
        }
        return formattedResult;
    };

    ctrl.orderProp="added";
}


quizApp.controller('BookListCtrl', BookListCtrl);

