/**
 * Created by ak on 03.08.2015.
 */
//Controller to represent the list of books
'use strict';
BookListCtrl.$inject = ['$location','dataFactory'];


function BookListCtrl($location, dataFactory){
    var ctrl = this;

    ctrl.status;
    ctrl.books;
    ctrl.results=[];
    ctrl.totalResult={pointsEarned:0, pointsToEarn:0, formattedPoints:""};
    ctrl.resultsLoaded=false;
    ctrl.orderProp="added";

    //get the data from factory and init the variables
    activate();

    //functions as bindable members
    ctrl.getBookResult = getBookResult;


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
    function getBookResult(bookID) {
        var formattedResult = "---";
        if (ctrl.results.length > 0) {
            for(var idx in ctrl.results){
                if (ctrl.results[idx].bookid == bookID) {
                    formattedResult = ctrl.results[idx].pointsEarned + " / " + ctrl.results[idx].pointsToEarn;
                }
            }
        }
        return formattedResult;
    }


    //get the data via abstracted data factory
    function activate(){

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
    }

}


quizApp.controller('BookListCtrl', BookListCtrl);

