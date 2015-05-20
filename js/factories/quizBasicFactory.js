/**
 * Created by ak on 19.05.2015.
 */
angular.module('quizApp')
    .factory('quizBasicFactory', ['$http', function($http){
        //firefox allows to use a local json file only if it in the same/sub directory
        return $http.get('./data/book-01.json');
    }]);