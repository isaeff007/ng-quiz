/**
 * Created by ak on 19.05.2015.
 */
//the '$http' inject annotation does not get minify and so the according service can be found by injector.
//so else the use of '$http' parameter is not mandatory.
dataFactory.$inject=['$http'];

function dataFactory($http){
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
        return $http.get("http://localhost:3000/books");
    }

    //get the selected book quiz
    function getBook(bookID){
        return $http.get("http://localhost:3000/books/"+bookID);
    }

    //get the quiz results for all books
    function getResults() {
        return $http.get("http://localhost:3000/results");
    }
    //get the quiz results for specific book
    function getBookResult (bookID) {
        return $http.get("http://localhost:3000/results"+bookID);
    }

    //save results for an specific book
    function updateBookResults(bookResult){
        return $http.put("http://localhost:3000/results/"+bookResult.bookID, bookResult);
    }

    //create a new book
    function createBook(newBook){
        return $http.post("http://localhost:3000/books", newBook);
    }

    //return the factory as object with assigned methods.
    return bookFactory;

}

//inject into the application
quizApp.factory('dataFactory', dataFactory);



