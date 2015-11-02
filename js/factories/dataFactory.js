/**
 * Created by ak on 19.05.2015.
 */
//the '$http' inject annotation does not get minify and so the according service can be found by injector.
//so else the use of '$http' parameter is not mandatory.
'use strict';

//inject the configuration values (besides $http)
dataFactory.$inject=['$http', 'appConfig'];

function dataFactory($http, config){
    var bookFactory = {};

    //functions as bindable members
    bookFactory.getBooks =getBooks;
    bookFactory.getBook = getBook;
    bookFactory.getResults = getResults;
    bookFactory.getBookResult = getBookResult;
    bookFactory.updateBookResults = updateBookResults;
    bookFactory.createBook = createBook;


    //retrieve the book list via REST API from mongo DB
    function getBooks() {
        return $http.get(config.basePath+'/books');
    }

    //get the selected book quiz
    function getBook(bookID){
        return $http.get(config.basePath+'/books/'+bookID);
    }

    //get the quiz results for all books
    function getResults() {
        return $http.get(config.basePath+'/results');
    }
    //get the quiz results for specific book
    function getBookResult (bookID) {
        return $http.get(config.basePath+'/results/'+bookID);
    }

    //save results for an specific book
    function updateBookResults(bookResult){
        return $http.put(config.basePath+'/results/'+bookResult.bookID, bookResult);
    }

    //create a new book
    function createBook(newBook){
        return $http.post(config.basePath+'/books', newBook);
    }

    //return the factory as object with assigned methods.
    return bookFactory;

}

//inject into the application
quizApp.factory('dataFactory', dataFactory);



