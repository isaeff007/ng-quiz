/**
 * Created by ak on 29.05.2015.
 */
angular.module('quizApp')
    //let us use the JSON objects as constants
    .constant('QUIZCONSTANTS', { //this name has to be injected into the controller
        YES: 'Да',
        NO: 'Нет',
        CORRECT: 'Молодец, Антоха!',
        INCORRECT: 'Мимо'
    });
