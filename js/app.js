/**
 * Created by ak on 19.05.2015.
 */
'use strict';
/*App Module */
var quizApp =angular.module('quizApp',[
    "ngRoute",
    'ui.bootstrap',
    'ngMessages'
]);

quizApp.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
            when('/books', {
                templateUrl: 'partials/book-list.html',
                controller: 'BookListCtrl as blc'
            }).
            //All variables defined with the : notation are extracted into the $routeParams (i.e. in controller function)
            when('/books/:bookID', {
                templateUrl: 'partials/book-detail.html',
                controller: 'BookDetailCtrl as bdc'
            }).
            when('/book/new', {
                templateUrl: 'partials/book-form.html',
                controller: 'BookFormCtrl as bfc'
            }).
            otherwise({
                redirectTo: '/books'
            });

    }]);