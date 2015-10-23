/**
 * Created by ak on 19.05.2015.
 */
//the '$http' inject annotation does not get minify and so the according service can be found by injector.
//so else the use of '$http' parameter is not mandatory.
quizApp
    .factory('dataFactory', ['$http', function($http){
        //firefox allows to use a local json file only if it in the same/sub directory
        var bookFactory = {};

        //retrieve the book list via REST API from mongo DB
        bookFactory.getBooks = function () {
            return $http.get("http://localhost:3000/books");
        };

        //get the selected book quiz
        bookFactory.getBook = function(bookID){
            return $http.get("http://localhost:3000/books/"+bookID);
        };

        //get the quiz results for all books
        bookFactory.getResults = function () {
            return $http.get("http://localhost:3000/results");
        };
        //get the quiz results for specific book
        bookFactory.getBookResult = function (bookID) {
            return $http.get("http://localhost:3000/results"+bookID);
        };

        //save results for an specific book
        bookFactory.updateBookResults = function(bookResult){
            return $http.put("http://localhost:3000/results/"+bookResult.bookID, bookResult);
        };

        bookFactory.createBook = function(newBook){
            return $http.post("http://localhost:3000/book/new", newBook);
        };

        //return the factory as object with assigned methods.
        return bookFactory;

    }]);