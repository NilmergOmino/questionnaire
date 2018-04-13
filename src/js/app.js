import '../scss/style.scss';
const Questions = require('./data/questions.json');


window.addEventListener('DOMContentLoaded', () =>{
    Query.init();
})
const Query = {
    startPanel: document.getElementById('startPanel'),
    endPanel: document.getElementById('endPanel'),
    form: document.getElementById('form'),
    questionnaireTitle: document.getElementById('questionnaireTitle'),
    buttonStart: document.getElementById('buttonStart'),
    choicesContainer: document.getElementById('choicesContainer'),
    buttonBack: document.getElementById('buttonBack'),
    buttonNext: document.getElementById('buttonNext'),
    buttonFinish: document.getElementById('buttonFinish'),
    progress: document.getElementById('progress'),
    progressBar: document.getElementById('progressBar'),
    init: function(){
        this.setTitle();
        this.questionsArr = [];
        this.setQuestions();
        this.radioItems = document.querySelectorAll('._js-radio');
        this.currentQuestion = 0;
        this.lastQuestion = this.questionsArr.length-1;
        this.radioItems.forEach(el=>el.addEventListener('click', ()=>{
            let checkedItems = document.querySelectorAll('._js-radio:checked').length;
            Query.setProgress(checkedItems);
            if(checkedItems == Query.lastQuestion+1){
                Query.showButtonFinish();
            }
        }))
        this.buttonStart.addEventListener('click', ()=>{
            Query.hide(Query.startPanel);
            Query.show(Query.form);
            Query.showQuestion(0);
        })
        this.buttonBack.addEventListener('click', (event)=>{
            Query.showQuestion(-1);
            event.preventDefault();
        })
        this.buttonNext.addEventListener('click', (event)=>{
            Query.showQuestion(1);
            event.preventDefault();
        })
    },
    setTitle: function(){
        this.questionnaireTitle.textContent = Questions.title;
    },
    setQuestions: function(){
        let fragment = document.createDocumentFragment();
        for(let key in Questions){
            if(Questions.hasOwnProperty(key)){
                if(key != 'title'){
                    let choicesItem = document.createElement('div');
                    choicesItem.classList.add('form_choicesItem', 'choicesItem', '-hidden');
                    let questionTitle = document.createElement('h3');
                    questionTitle.classList.add('form_question');
                    questionTitle.textContent = Questions[key].question;
                    choicesItem.appendChild(questionTitle);
                    fragment.appendChild(choicesItem);
                    Questions[key].choices.forEach((el,index)=>{
                        let choiceBox = document.createElement('div');
                        choiceBox.classList.add('choicesItem_box');
                        choicesItem.appendChild(choiceBox);
                        let id = key+"-"+index;
                        choiceBox.innerHTML = '<input type="radio" name="'+key+'" class="choicesItem_radio _js-radio" value="'+el+'" id="'+id+'">';
                        choiceBox.innerHTML += '<label for="'+id+'" class="choicesItem_label">'+el+'</label>';
                    })
                    Query.questionsArr.push(choicesItem);
                }
            }
        }
        this.choicesContainer.appendChild(fragment);
    },
    setProgress: function(value){
        let max = Query.lastQuestion+1;
        let current = value/max*100;
        this.progress.style.width = current+'%';
        let left = max - value;
        let titleInfo = (left == 1)? left+' question left' : left+' questions left';
        this.progressBar.setAttribute('title', titleInfo);
    },
    hide: function(el){
        el.classList.add('-hidden');
    },
    show: function(el){
        el.classList.remove('-hidden');
    },
    showQuestion: function(direction){
        this.questionsArr.forEach(el=>Query.hide(el));
        this.currentQuestion+=direction;
        if(this.currentQuestion <= 0){
            this.currentQuestion = 0;
            this.disableButton(this.buttonBack);
            this.enableButton(this.buttonNext);
        }
        else if(this.currentQuestion >= this.lastQuestion){
            this.currentQuestion = this.lastQuestion;
            this.disableButton(this.buttonNext);
            this.enableButton(this.buttonBack);
        }
        else {
            this.enableButton(this.buttonNext);
            this.enableButton(this.buttonBack);
        }
        let element = this.questionsArr[this.currentQuestion];
        this.show(element);
    },
    disableButton: function(el){
        el.classList.add('-disabled');
    },
    enableButton: function(el){
        el.classList.remove('-disabled');
    },
    showButtonFinish: function(){
        this.show(this.buttonFinish);
        this.buttonFinish.addEventListener('click',(event)=>{
            Query.hide(Query.form);
            Query.show(Query.endPanel);
            event.preventDefault();
            // this is a place to send all answers from filled form (database needed)
        })
    }
}
