/**
 * Created by ak on 23.10.2015.
 */

'use strict';
BookFormCtrl.$inject=['$location','dataFactory'];

function BookFormCtrl($location ,dataFactory){
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

    ctrl.save = saveBook;
    ctrl.cancel=cancel;

    //the object wil be filled in the form
    ctrl.newbook = new Book();



    function saveBook() {

        if (ctrl.newbook.id){
            dataFactory.createBook(ctrl.newbook).then(function(){
               goToList();
            });
        } else{
            console.log("new book is not valid");
        }
    }

    function cancel(){
        goToList();
    }

    //redirect to the book list
    function goToList() {
        $location.path('/books');
    }

}

quizApp.controller('BookFormCtrl',BookFormCtrl);
