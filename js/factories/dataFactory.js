/**
 * Created by ak on 19.05.2015.
 */
//the '$http' inject annotation does not get minify and so the according service can be found by injector.
//so else the use of '$http' parameter is not mandatory.
quizApp
    .factory('dataFactory', ['$http', function($http){
        //firefox allows to use a local json file only if it in the same/sub directory
        var bookFactory = {};

        //retrieve the book list
        bookFactory.getBooks = function () {
            return $http.get('./books/books.json');
        }

        //get the selected book quiz
        bookFactory.getBook = function(bookID){
            return $http.get('./books/'+bookID+'.json');
        }

        //get the quiz results for all books
        //retrieve the book list
        bookFactory.getResults = function () {
            return $http.get('./books/results.json');
        }

        //return the factory as object with assigned methods.
        return bookFactory;

    }]);