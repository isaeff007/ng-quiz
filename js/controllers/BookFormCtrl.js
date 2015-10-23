/**
 * Created by ak on 23.10.2015.
 */
quizApp.controller('BookFormCtrl', ['dataFactory', function( dataFactory){

    ctrl = this;

    function Book(){
        this.added= new Date().toJSON().slice(0,10);
        this.id='default id';
        this.imageUrl='';
        this.name='name from BFC';
        this.author='';
        this.published=0;
    }

    ctrl.newbook = new Book();


}]);
