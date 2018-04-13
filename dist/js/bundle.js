/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

var Questions = __webpack_require__(2);

window.addEventListener('DOMContentLoaded', function () {
    Query.init();
});
var Query = {
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
    init: function init() {
        this.setTitle();
        this.questionsArr = [];
        // this.progress = 0;
        this.setQuestions();
        this.setProgress(0);
        this.radioItems = document.querySelectorAll('._js-radio');
        this.currentQuestion = 0;
        this.lastQuestion = this.questionsArr.length - 1;
        this.radioItems.forEach(function (el) {
            return el.addEventListener('click', function () {
                var checkedItems = document.querySelectorAll('._js-radio:checked').length;
                Query.setProgress(checkedItems);
                if (checkedItems == Query.lastQuestion + 1) {
                    Query.showButtonFinish();
                }
            });
        });
        this.buttonStart.addEventListener('click', function () {
            Query.hide(Query.startPanel);
            Query.show(Query.form);
            Query.showQuestion(0);
        });
        this.buttonBack.addEventListener('click', function (event) {
            Query.showQuestion(-1);
            event.preventDefault();
        });
        this.buttonNext.addEventListener('click', function (event) {
            Query.showQuestion(1);
            event.preventDefault();
        });
    },
    setTitle: function setTitle() {
        this.questionnaireTitle.textContent = Questions.title;
    },
    setQuestions: function setQuestions() {
        var fragment = document.createDocumentFragment();

        var _loop = function _loop(key) {
            if (Questions.hasOwnProperty(key)) {
                if (key != 'title') {
                    var choicesItem = document.createElement('div');
                    choicesItem.classList.add('form_choicesItem', 'choicesItem', '-hidden');
                    var questionTitle = document.createElement('h3');
                    questionTitle.classList.add('form_question');
                    questionTitle.textContent = Questions[key].question;
                    choicesItem.appendChild(questionTitle);

                    fragment.appendChild(choicesItem);
                    Questions[key].choices.forEach(function (el, index) {
                        var choiceBox = document.createElement('div');
                        choiceBox.classList.add('choicesItem_box');
                        choicesItem.appendChild(choiceBox);
                        var id = key + "-" + index;

                        choiceBox.innerHTML = '<input type="radio" name="' + key + '" class="choicesItem_radio _js-radio" value="' + el + '" id="' + id + '">';

                        choiceBox.innerHTML += '<label for="' + id + '" class="choicesItem_label">' + el + '</label>';
                    });
                    Query.questionsArr.push(choicesItem);
                }
            }
        };

        for (var key in Questions) {
            _loop(key);
        }
        this.choicesContainer.appendChild(fragment);
    },
    setProgress: function setProgress(value) {
        var max = Query.lastQuestion + 1;
        var current = value / max * 100;
        Query.progress.style.width = current + '%';
    },
    hide: function hide(el) {
        el.classList.add('-hidden');
    },
    show: function show(el) {
        el.classList.remove('-hidden');
    },
    showQuestion: function showQuestion(direction) {
        Query.questionsArr.forEach(function (el) {
            return Query.hide(el);
        });
        Query.currentQuestion += direction;
        if (Query.currentQuestion <= 0) {
            Query.currentQuestion = 0;
            Query.disableButton(Query.buttonBack);
            Query.enableButton(Query.buttonNext);
        } else if (Query.currentQuestion >= Query.lastQuestion) {
            Query.currentQuestion = Query.lastQuestion;
            Query.disableButton(Query.buttonNext);
            Query.enableButton(Query.buttonBack);
        } else {
            Query.enableButton(Query.buttonNext);
            Query.enableButton(Query.buttonBack);
        }
        var element = Query.questionsArr[Query.currentQuestion];
        Query.show(element);
    },
    disableButton: function disableButton(el) {
        el.classList.add('-disabled');
    },
    enableButton: function enableButton(el) {
        el.classList.remove('-disabled');
    },
    showButtonFinish: function showButtonFinish() {
        this.show(this.buttonFinish);
        this.buttonFinish.addEventListener('click', function (event) {
            Query.hide(Query.form);
            Query.show(Query.endPanel);
            event.preventDefault();
            // sending all answers from filled form (database needed)
        });
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {"title":"Questionnaire about blabla.","q1":{"question":"blablabla?","choices":["aa","bb","cc"]},"q2":{"question":"blabla?","choices":["dd","ee","ff"]},"q3":{"question":"blablaxx?","choices":["dgag","agaw","ff","agqawet"]}}

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map