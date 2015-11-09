/**
 * Created by ak on 09.11.2015.
 */
//================================================
// Add an interceptor for AJAX errors (intercept all http requests)
//================================================
angular.module('appAuth', []).config(['$httpProvider', function($httpProvider) {

    $httpProvider.interceptors.push(['$q', '$location' ,function ($q, $location) {
        return {
            response: function (response) {
                // do something on success
                return response;
            },
            responseError: function (response) {
                if (response.status === 401)
                    $location.url('login');
                return $q.reject(response);
            }
        };
    }]);
}]);


