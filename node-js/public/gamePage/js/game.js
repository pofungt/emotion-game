import { sleep } from "./setTimeout.js";
import { Timer } from "./timer.js";

const LEVELS_TIME = {
    1: 15,
    2: 12,
    3: 10,
    4: 8,
    5: 5
};

const EMOTIONS_LABEL = ["Angry", "Disgust", "Fear", "Happy", "Sad", "Surprise"];
const EMOTIONS_SRC = ["./img/angry.jpeg", "./img/disgust.jpg", "./img/fear.jfif", "./img/happy.jfif", "./img/sad.jpg", "./img/surprise.jpg"];

class EmoGame {
    constructor() {
        this.point = 0;
        this.level = 1;
        this.correctAnswers = 0;
        this.questionsAsked = 0;
    }
}

async function gameStart() {
    const countDownToStart = document.querySelector("#count_down_to_start");
    let game = new EmoGame();

    // Countdown to start
    countDownToStart.style.display = "flex";
    await sleep(() => { countDownToStart.innerHTML = "2"; }, 1000);
    await sleep(() => { countDownToStart.innerHTML = "1"; }, 1000);
    await sleep(() => { countDownToStart.style.display = "none"; }, 1000);
    // Start timer
    const timer = new Timer(LEVELS_TIME[game.level]);
    timer.start();
    // Randomly pick emotion for question
    const randomIndex = Math.floor(Math.random() * 6);
    const emotionQuestion = EMOTIONS_LABEL[randomIndex];
    const emotionQuestionImg = EMOTIONS_SRC[randomIndex];
    document.querySelector("#question_frame").innerHTML = `
        <img src="${emotionQuestionImg}">
        <div id="emo_description">${emotionQuestion}</div>
    `;

    // Check if player makes the right emotion
    let continuePlay = true;
    let answeredCorrectly = false;
    while (continuePlay && timer.getTimeUsed() < LEVELS_TIME[game.level]) {
        // Set interval to not block the event loop
        await sleep(()=>{
            if (window.emotion === emotionQuestion && window.emotionTime >= 2) {
                // Get the time used to get correct answer
                const timeUsed = timer.getTimeUsed();
                // Calculate the score for this question
                game.point += Math.floor(Math.log(game.level + 1) * (LEVELS_TIME[game.level] - timeUsed) * 100);
                console.log(game.point);
                // Add the number of correct answers by 1
                game.correctAnswers++;
                // Set the parameters
                answeredCorrectly = true;
                continuePlay = false;
            }
        }, 1);
    }
    console.log("yay")
    // Things to do here
    // Loop through questions and levels
}

gameStart();