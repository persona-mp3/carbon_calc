const questions = [
    {
        topic: 'Electricity',
        question: 'How much do you spend on electricity monthly?',
        options: ['1000 - 2000kWH', '2000-3000kWH', '3500 - 5000kWH'],
        values: [1500, 2500, 4500 ]
    },



    {
        topic: 'Travel',
        question: 'How many flights do you take per year',
        options: ['None', '1-2 Short Flights', '3-5 Short Flights', '1-4 Long flights'],
        values: [100, 1510, 2510, 4500]
    },
    
    {
        topic: 'Commute',
        question: 'If you drive, what is your approximate annual mileage?',
        options: ['I do not own a car', 'Low (under 5,000 miles)', 'Average (5,000-10,000 miles)', 'High (10,000-15,000 miles+) '],
        values: [0, 1000, 2500, 4000],  // CO2e values in kg/year
        info: 'Based on average emissions of 250g CO2e/mile for standard vehicles'
  
    }, 

    {
        topic: 'Diet',
        question: 'What is your primary diet?',
        options: ['Vegan', 'Vegetarian', 'Pescatarian', 'Ominivore'],
        values: [100, 1510, 2510, 4500]
    },
    {
        topic: 'water',
        question: 'How would you describe your water usage ?',
        options: ['Very efficient (short showers, full laundry loads)', 'Average usage', 'High usage (long showers, frequent laundry/dishwasher)'],
        values: [100, 250, 400],  // CO2e values in kg/year
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
                displayResults(userAnswer)
                return 1;
            }
        

            currentQuestionIndex++
            console.log(currentQuestionIndex)
            handleQuestion(currentQuestionIndex)



        })
    })

    return userAnswer


}


function displayResults(userAnswer) {
    // let carbonEquivalent = [];
    const number = 90
    const renderFootprint = document.getElementById('totalFootprint');
    const unit = document.querySelector('.unit');
    const myChart = document.getElementById('myCanvas').getContext('2d');

        Chart.defaults.font.family = 'Poppins';
        Chart.defaults.font.size = 20;

        let carbonEmissonChart = new Chart(myChart, {
            type: "bar",
            data: {
                labels: ['Electricity', 'Commute', 'Transportation', 'Diet'],
                datasets: [{
                    label: 'C02 Emission',
                    data: [2000, 3000, 4000, 400],
                    backgroundColor: ['red', 'blue', 'pink', 'yellow'],
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'grey',
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: "Your Carbon Footprint Emissions",
                        color: 'white',

                        font: {

                            size: 30,
                        }
                    },

                    // legend: {
                    //     display: false
                    // }
    
                }
            },

        })

    let totalFootprint = 0;
    // iterate through the object to get the values;
    for (let carbonEquivalent of Object.values(userAnswer)) {
        totalFootprint += Number(carbonEquivalent)
    }

    renderFootprint.innerText = `${number}t`;
    unit.textContent = 't'

    console.log(totalFootprint)
}







let obj = {
    name: 5
}
displayResults(obj)

handleQuestion(currentQuestionIndex)


backBtn.addEventListener('click', (evt) => {
    currentQuestionIndex--
    console.log(currentQuestionIndex)

    const currentIndex = handleQuestion(currentQuestionIndex);

})
