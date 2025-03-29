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
        values: [800, 1510, 2510, 4500]
    },
    
    {
        topic: 'Commute',
        question: 'If you drive, what is your approximate annual mileage?',
        options: ['I do not own a car', 'Low (under 5,000 miles)', 'Average (5,000-10,000 miles)', 'High (10,000-15,000 miles+) '],
        values: [1450, 1000, 2500, 4000],  // CO2e values in kg/year
        info: 'Based on average emissions of 250g CO2e/mile for standard vehicles'
  
    }, 

    {
        topic: 'Diet',
        question: 'What is your primary diet?',
        options: ['Vegan', 'Vegetarian', 'Pescatarian', 'Ominivore'],
        values: [1200, 1510, 2510, 4500]
    },

    {
        topic: 'water',
        question: 'How would you describe your water usage ?',
        options: ['Very efficient (short showers, full laundry loads)', 'Average usage', 'High usage (long showers, frequent laundry/dishwasher)'],
        values: [1300, 2500, 4000],  // CO2e values in kg/year
    },

    {
        topic: 'Waste',
        question: 'How thoroughly do you recycle?',
        options: ['Comprehensive recycling and composting', 'Standard recycling (paper, plastic, glass)', 'Minimal recycling', 'No recycling'],
        values: [1000, 2000, 3000, 4000],  // Multiplier to consumption emissions
        info: 'Recycling reduces the carbon impact of consumption'
      }    
]

const currentQuestion = document.getElementById('currentQuestion')
const topic = document.getElementById('topic')
const answerContainer = document.getElementById('answerContainer');
const quizProgress = document.getElementById('quizProgress');
const backBtn = document.getElementById('backBtn');
const advice = document.querySelector('.advice');

let case1 = `
                Your carbon foot print is measure in tonnes, 
                and the values used where based of the research in 2021.
                From your results, you carbon footprint is amazing, keep up!
                `

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

            // console.log(userAnswer);


            if (currentQuestionIndex === questions.length-1) {
                // console.log(currentQuestionIndex, questions.length)
                currentQuestionIndex = questions.length-1;
                console.log('end quiz')
                // display results function
                console.log(userAnswer)
                document.querySelector('main').innerHTML = " "
                displayResults(userAnswer)
                return 1;
            }
        

            currentQuestionIndex++
            handleQuestion(currentQuestionIndex)



        })
    })

    return userAnswer


}


function displayResults(userAnswer) {
    // these wil be used as data and label properties in chart object
    let carbonEmissons = [];
    let emissonSources = []

    const renderFootprint = document.getElementById('totalFootprint');
    const unit = document.createElement('span');

    const myChart = document.getElementById('myCanvas').getContext('2d');




    let totalFootprint = 0;
    // extracting sources and values through the object to get the values;
    for (let [source, value] of Object.entries(userAnswer)) {

        totalFootprint += Number(value);
        carbonEmissons.push(Number(value));

        emissonSources.push(source);
    }

    renderFootprint.innerText = `${(totalFootprint/1000).toFixed(2)}`;
    unit.innerText = 't';
    renderFootprint.appendChild(unit)

    console.log(totalFootprint)

    advice.innerText = case1


    Chart.defaults.font.family = 'Poppins';
    Chart.defaults.font.size = 20;

    let carbonConversion = carbonEmissons.map(val => val/1000);


    let carbonEmissonChart = new Chart(myChart, {
        type: "bar",
        data: {
            labels: emissonSources,
            datasets: [{
                label: 'C02 Emission',
                data:carbonConversion,
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

            }
        },

    })


}







handleQuestion(currentQuestionIndex)


backBtn.addEventListener('click', (evt) => {
    currentQuestionIndex--
    // console.log(currentQuestionIndex)

    const currentIndex = handleQuestion(currentQuestionIndex);

})
