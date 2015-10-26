/**
 * Created by ak on 23.10.2015.
 */
BookFormCtrl.$inject=['dataFactory'];

function BookFormCtrl(dataFactory){
    ctrl = this;

    //use as a DTO for server api
    function Book(){
        this.added= new Date().toJSON().slice(0,10);
        this.id='default id';
        this.imageUrl='';
        this.name='name from BFC';
        this.author='';
        this.published=0;
    }

    ctrl.newbook = new Book();

}

quizApp.controller('BookFormCtrl',BookFormCtrl);
