/**
 * Created by ak on 23.10.2015.
 */
BookFormCtrl.$inject=['dataFactory'];

function BookFormCtrl(dataFactory){
    var ctrl = this;

    //use as a DTO for server api
    function Book(){
        this.added= new Date().toJSON().slice(0,10);
        this.id='';
        this.imageUrl='';
        this.name='';
        this.author='';
        this.published=0;
    }

    ctrl.save = save();

    //the object wil be filled in the form
    ctrl.newbook = new Book();


    function save() {

        if (ctrl.newbook.id){
            dataFactory.createBook(ctrl.newbook);
        } else{
            console.log("new book is not valid");
        }
    }

}

quizApp.controller('BookFormCtrl',BookFormCtrl);
