/**
 * Created by ak on 05.11.2015.
 */

angular.module('appRoutes',['appAuth']).config(['$routeProvider',
    function($routeProvider, authFactory){

        //==============  for the Auth part ===================================
        var checkLoggedin = function($q, $http, $location, $rootScope){
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('http://localhost:3000/auth/loggedin').success(function(user){
                // Authenticated
                if (user !== '0')
                    deferred.resolve();
                // Not Authenticated
                else {
                    $rootScope.message = 'You need to log in.';
                    deferred.reject();
                    $location.url('login');
                }
            });

            return deferred.promise;
        };

        $routeProvider.
            when('/books', {
                templateUrl: 'public/views/book-list.html',
                controller: 'BookListCtrl as blc'
            }).
            //All variables defined with the : notation are extracted into the $routeParams (i.e. in controller function)
            when('/books/:bookID', {
                templateUrl: 'public/views/book-detail.html',
                controller: 'BookDetailCtrl as bdc',
                resolve: {
                    loggedin : checkLoggedin
                }
            }).
            when('/book/new', {
                templateUrl: 'public/views/book-form.html',
                controller: 'BookFormCtrl as bfc',
                resolve: {
                    loggedin : checkLoggedin
                }
            }).
            when('/login', {
                templateUrl: 'public/views/login.html',
                controller: 'LoginCtrl as lfc'
            }).
            otherwise({
                redirectTo: '/books'
            });


    }]);
