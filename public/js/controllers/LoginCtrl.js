/**
 * Created by ak on 09.11.2015.
 */
LoginCtrl.$inject = ['$rootScope', '$location', 'authFactory'];


function LoginCtrl($rootScope, $location, authFactory){
ctrl = this;

ctrl.errorMessage='';

function User(){
    this.email = ''; //the user name field name in strategy  (s. user model) and strategy definition.
    this.password= '';
}
 //the user is filled by the form
 ctrl.user= new User();

//register the login function called from the form
ctrl.login = login;

    function login(){
        authFactory.loginUser(ctrl.user).success(function(user, status){
            //no error , authentication OK
            ctrl.errorMessage='Welcome, '+user.local.name+ '!';
            return user.local.name;
            //$location.url('/books')
        })
            .error(function(err, info, zusatz){
                ctrl.errorMessage='Login failed';

                $location.url('login');
            });

    }
}

quizApp.controller('LoginCtrl', LoginCtrl);
