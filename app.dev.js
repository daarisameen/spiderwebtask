

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;


function setAvailableQuestion(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++)
    {
        availableQuestions.push(quiz[i])
    }
    
}


function getNewQuestion(){
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;
    const questionIndex = availableQuestions[Math.floor(Math.random()*availableQuestions.length)]
    
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    
    const index1 = availableQuestions.indexOf(questionIndex);
   availableQuestions.splice(index1,1);


   const optionLen = currentQuestion.options.length
    for(let i=0;i<optionLen;i++)
    {
        availableOptions.push(i);
    }
optionContainer.innerHTML = '';
let animationDelay = 0.15;

    for(let i=0; i<optionLen;i++){
        const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const index2 = availableOptions.indexOf(optonIndex);
        availableOptions.splice(index2,1);
    
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optonIndex];
        option.id = optonIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.2;
        option.className = "option";
        optionContainer.appendChild(option)

        option.setAttribute("onclick","getResults(this)");


    }

   //console.log(availableOptions)  
    //console.log(questionIndex)
   //console.log(availableQuestions)
    questionCounter++;


}


function getResults(element){
    const id = parseInt(element.id);
    
    if(id === currentQuestion.answer){
        //console.log("answer is correct");
        element.classList.add("correct");
        //add indicator to corect mark
        updateAnswerIndicator("correct");
        correctAnswers++;
        console.log("correct:" + correctAnswers)
    }
    else{
        element.classList.add("wrong");
        //add indicator to wrong mark
        updateAnswerIndicator("wrong");
        const optionLen = optionContainer.children.length;
        for(let i=0;i<optionLen;i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer ){
                optionContainer.children[i].classList.add("correct");

            }
        }

    }
    attempt++;
unclickableoptions();

}

//happy coding

function unclickableoptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen;i++)
    {
        optionContainer.children[i].classList.add("already-answered");

    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion;i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    
    }
}

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType)

}

function next(){
    if(questionCounter === quiz.length){
        console.log("quiz over");
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

function quizOver(){
        // hide quiz quizBox
      resultBox.classList.remove("hide");
    quizBox.classList.add("hide");
    quizResult();
        // show result Box
    
    
}

function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML =percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
    if(percentage >= 50.00 || percentage < 70)
    resultBox.querySelector(".feed-back").innerHTML = "Work Hard";
    if(percentage >= 70.00)
    resultBox.querySelector(".feed-back").innerHTML = "Good";
    if(percentage < 50.00)
    resultBox.querySelector(".feed-back").innerHTML = "Better luck next time";

    
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;


}

function goToHome(){

    resultBox.classList.add("hide");
    homeBox.classList.remove("hide");
    resetQuiz();
}


function tryAgainQuiz(){
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function startQuiz(){

    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setAvailableQuestion();
    getNewQuestion();

    answersIndicator();
    
} 

window.onload = function () {
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}
