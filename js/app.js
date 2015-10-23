/**
 * Created by ak on 19.05.2015.
 */
'use strict';
/*App Module */
var quizApp =angular.module('quizApp',[
    "ngRoute",
    'ui.bootstrap'
]);

quizApp.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
            when('/books', {
                templateUrl: 'partials/book-list.html',
                controller: 'BookListCtrl'
            }).
            //All variables defined with the : notation are extracted into the $routeParams (i.e. in controller function)
            when('/books/:bookID', {
                templateUrl: 'partials/book-detail.html',
                controller: 'BookDetailCtrl'
            }).
            when('/book/new', {
                templateUrl: 'partials/book-form.html',
                controller: 'BookFormCtrl as bfc'
            }).
            otherwise({
                redirectTo: '/books'
            });

    }]);