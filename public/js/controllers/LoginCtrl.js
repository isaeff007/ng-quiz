/**
 * Created by ak on 09.11.2015.
 */
LoginCtrl.$inject = ['$rootScope', '$location', 'authFactory'];


function LoginCtrl($rootScope, $location, authFactory){
ctrl = this;

ctrl.errorMessage='';

function User(){
    this.email = ''; //the name in strategy --> should be later 'username'
    this.password= '';
}
 //the user is filled by the form
 ctrl.user= new User();

//register the login function called from the form
ctrl.login = login;

    function login(){
        authFactory.loginUser(ctrl.user).success(function(user){
            //no error , authentication OK
            ctrl.errorMessage='User '+user.username+ ' is ok';
            //$location.url('/books')
        })
            .error(function(){
                ctrl.errorMessage='Login failed';
                $location.url('login');
            });

    }
}

quizApp.controller('LoginCtrl', LoginCtrl);
