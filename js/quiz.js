const questions = [
    {
        topic: 'Electricity',
        question: 'How much do you spend on electricity monthly?',
        options: ['1000 - 2000kWH', '2000-3000kWH', '3500 - 5000kWH'],
        values: [1500, 2500, 4500 ]
    },



    {
        topic: 'Transportation',
        question: 'How many flights do you take per year',
        options: ['None', '1-2 Short Flights', '3-5 Short Flights', '1-4 Long flights'],
        values: [100, 1510, 2510, 4500]
    },

    {
        topic: 'Diet',
        question: 'What is your primaty diet?',
        options: ['Vegan', 'Vegetarian', 'Pescatarian', 'Ominivore'],
        values: [100, 1510, 2510, 4500]
    },
    {
        topic: 'water',
        question: 'How much water do you typically use?',
        options: ['Minimal Usage', 'Moderate', 'Average Usage', 'High Usage'],
        values: [100, 1510, 2510, 4500]
    },
    
]

const currentQuestion = document.getElementById('currentQuestion')
const topic = document.getElementById('topic')
const answerContainer = document.getElementById('answerContainer');
const quizProgress = document.getElementById('quizProgress');
const backBtn = document.getElementById('backBtn')

let currentQuestionIndex = 0
const userAnswer = {}


function handleQuestion(index) {
    // to check the current value of index
    if (index < 0) {
        currentQuestionIndex = 0;
        console.log('disable back btn')
        return 0;
    }


    // clear the current innerHTML and then update
    quizProgress.innerHTML = " "
    questions.forEach(question => {
        quizProgress.innerHTML += "<span></span>"
    })

    let spans = document.querySelectorAll('span');
    for (let i=0; i < index; i++) {
        spans[i].classList.add('seen')
    }
    
    // render UI with questions and answers
    let currQuestion = questions[index];
    topic.innerText = currQuestion.topic;
    currentQuestion.innerText = currQuestion.question;

    let options = currQuestion.options;
    let value = currQuestion.values

    // clear the current innerHTML and then update
    answerContainer.innerHTML = " "
    options.forEach((option, i) => {
        let button = document.createElement('button');
        button.classList.add('answer-btns')
        button.innerText = option;
        button.value = value[i]

        answerContainer.appendChild(button)
    })
    
    // get user answers
    const ansBtns = document.querySelectorAll('.answer-btns');

    ansBtns.forEach(button => {
        button.addEventListener('click', (e) => {

            userAnswer[currQuestion.topic] = e.target.value;

            console.log(userAnswer);


            if (currentQuestionIndex === questions.length-1) {
                console.log(currentQuestionIndex, questions.length)
                currentQuestionIndex = questions.length-1;
                console.log('end quiz')
                // display results function
                return 1;
            }
        

            currentQuestionIndex++
            console.log(currentQuestionIndex)
            handleQuestion(currentQuestionIndex)



        })
    })

    return userAnswer


}


handleQuestion(currentQuestionIndex)

backBtn.addEventListener('click', (evt) => {
    currentQuestionIndex--
    console.log(currentQuestionIndex)

    const currentIndex = handleQuestion(currentQuestionIndex);
    // console.log(currentIndex)
    // checkDuplicateValues(userAnswers, answerObj)

})
