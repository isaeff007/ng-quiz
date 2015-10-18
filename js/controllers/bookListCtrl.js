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
            })
                .error(function(error){
                    $scope.status='unable to load results: '+error.message;
                });


            //get the total results
            createTotalResult = function (){
                for (var key in $scope.results) {
                    if ($scope.results.hasOwnProperty(key)) {
                        var bookresult = $scope.results[key];
                        $scope.totalResult.pointsEarned+=bookresult.pointsEarned;
                        $scope.totalResult.pointsToEarn+=bookresult.pointsToEarn;
                    }
                }
                $scope.totalResult.formattedPoints=$scope.totalResult.pointsEarned + " / " + $scope.totalResult.pointsToEarn;
            };


            //get the results for selected book
            $scope.getResult4Book = function(bookID){
                var bookResult;
                var formattedResult;

                if  ($scope.results.hasOwnProperty(bookID)) {
                    bookResult = $scope.results[bookID];
                    formattedResult = bookResult.pointsEarned + " / " + bookResult.pointsToEarn;
                }else{
                    formattedResult="---";
                }
                return formattedResult;
            };


            $scope.orderProp="added";



        }]);

