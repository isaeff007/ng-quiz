/**
 * Created by ak on 05.11.2015.
 */

angular.module('appRoutes',[]).config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
            when('/books', {
                templateUrl: 'public/views/book-list.html',
                controller: 'BookListCtrl as blc'
            }).
            //All variables defined with the : notation are extracted into the $routeParams (i.e. in controller function)
            when('/books/:bookID', {
                templateUrl: 'public/views/book-detail.html',
                controller: 'BookDetailCtrl as bdc'
            }).
            when('/book/new', {
                templateUrl: 'public/views/book-form.html',
                controller: 'BookFormCtrl as bfc'
            }).
            when('/login', {
                templateUrl: 'public/views/login.html'
                //controller: 'BookFormCtrl as bfc'
            }).
            otherwise({
                redirectTo: '/books'
            });

    }]);
