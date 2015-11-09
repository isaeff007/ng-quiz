/**
 * Created by ak on 09.11.2015.
 */

//the '$http' inject annotation does not get minify and so the according service can be found by injector.
//so else the use of '$http' parameter is not mandatory.
'use strict';

//inject the configuration values (besides $http)
authFactory.$inject= ['$http','appConfig'];

function authFactory($http, config){
    var userFactory = {};

    //functions as bindable members
    userFactory.loginUser =loginUser;
    userFactory.checkIfLoggedIn =checkIfLoggedIn;


    function loginUser(userToCheck){
        return $http.post(config.basePath+'/auth/local-login', userToCheck);
    }

    function checkIfLoggedIn(){
        return $http.get(config.basePath+'/auth/loggedin');
    }


    return userFactory;

}

//inject into the application
quizApp.factory('authFactory', authFactory);
angular.module('appAuth').factory('authFactory', authFactory);



