/**
 * Created by ak on 03.08.2015.
 */
//Controller to represent the list of books
quizApp
    .controller('BookListCtrl',['$scope', 'dataFactory',
        function ($scope , dataFactory  ) {
            $scope.status;
            $scope.books;
            $scope.results=[];
            $scope.totalResult={pointsEarned:0, pointsToEarn:0, formattedPoints:""};
            $scope.resultsLoaded=false;

            dataFactory.getBooks().success(function (bookdata, status){
                  $scope.books = bookdata;
                  $scope.status = status;
                })
                    .error(function(error){
                        $scope.status='unable to load book list: '+error.message;
                    });

              dataFactory.getResults().success(function (resultdata, status){
                $scope.results = resultdata;
                $scope.status = status;
                createTotalResult();
                $scope.resultsLoaded = true;
            })
                .error(function(error){
                    $scope.status='unable to load results: '+error.message;
                });


            //get the total results
            createTotalResult = function (){
                if ($scope.results.length>0) {
                    for (var key in $scope.results) {
                        if ($scope.results.hasOwnProperty(key)) {
                            var bookresult = $scope.results[key];
                            $scope.totalResult.pointsEarned += bookresult.pointsEarned;
                            $scope.totalResult.pointsToEarn += bookresult.pointsToEarn;
                        }
                    }
                }
                $scope.totalResult.formattedPoints=$scope.totalResult.pointsEarned + " / " + $scope.totalResult.pointsToEarn;
            };


            //get the results for selected book iterating over results array
            $scope.getResult4Book = function(bookID) {
                var formattedResult = "---";
                if ($scope.results.length > 0) {
                    for(var idx in $scope.results){
                        if ($scope.results[idx].bookid == bookID) {
                            formattedResult = $scope.results[idx].pointsEarned + " / " + $scope.results[idx].pointsToEarn;
                        }
                    }
                }
                return formattedResult;
            };

            $scope.orderProp="added";

        }]);

