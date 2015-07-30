/**
 * Created by ak on 19.05.2015.
 */
angular.module('quizApp')
//the '$http' inject annotation does not get minify and so the according service can be found by injector.
//so else the use of '$http' parameter is not mandatory.
    .factory('quizBasicFactory', ['$http', function($http){
        //firefox allows to use a local json file only if it in the same/sub directory
        return $http.get('./data/book-02.json');
    }]);