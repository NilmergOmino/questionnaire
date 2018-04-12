import '../scss/style.scss';
const Questions = require('./data/questions.json');


window.addEventListener('DOMContentLoaded', () =>{
    Query.init();
})
const Query = {
    startPanel: document.getElementById('startPanel'),
    endPanel: document.getElementById('endPanel'),
    questionnaireTitle: document.getElementById('questionnaireTitle'),
    buttonStart: document.getElementById('buttonStart'),
    question: document.getElementById('question'),
    choicesContainer: document.getElementById('choicesContainer'),
    buttonBack: document.getElementById('buttonBack'),
    buttonNext: document.getElementById('buttonNext'),
    progress: document.getElementById('progress'),
    init: function(){
        this.setQuestions();
        this.setProgress();
        this.buttonStart.addEventListener('click', ()=>{
            console.log('aa');
        })
    },
    setQuestions: function(){

    },
    setProgress: function(){

    }

}
