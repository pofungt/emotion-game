import { sleep } from "./setTimeout.js";
import { Timer } from "./timer.js";

const LEVELS_TIME = {
    1: 15,
    2: 10,
    3: 5
};

const EMOTIONS_LABEL = ["Angry", "Disgust", "Fear", "Happy", "Sad", "Surprise"];
const EMOTIONS_SRC = ["./img/angry.jpeg", "./img/disgust.jpg", "./img/fear.jfif", "./img/happy.jfif", "./img/sad.jpg", "./img/surprise.jpg"];

class EmoGame {
    constructor() {
        this.point = 0;
        this.level = 1;
        this.correctAnswers = 0;
    }

    nextLevel() {
        this.level += 1;
    }

    correct(timeUsed) {
        // Calculate the score for this question
        this.point += Math.floor((15 - timeUsed) * 100);
        // Add the number of correct answers by 1
        this.correctAnswers += 1;
    }
}

async function gameStart() {
    let game = new EmoGame();
    // Loop through every levels
    for (let i = 0; i < 3; i++) {
        // Enlarge the upper-right-corner level label
        if (i > 0) {
            document.querySelector(`#level_${i}`).style.fontSize = "unset";
        }
        document.querySelector(`#level_${i + 1}`).style.fontSize = "40px";
        // Clear result board
        const result_elements = document.querySelectorAll(".result_elements");
        result_elements.forEach((each) => {
            each.innerHTML = "";
        });
        // Countdown to start
        const countDownToStart = document.querySelector("#count_down_to_start");
        countDownToStart.style.display = "flex";
        countDownToStart.innerHTML = "3";
        await sleep(() => { countDownToStart.innerHTML = "2"; }, 1000);
        await sleep(() => { countDownToStart.innerHTML = "1"; }, 1000);
        await sleep(() => { countDownToStart.style.display = "none"; }, 1000);
        // Loop through every questions in the level
        for (let j = 0; j < 5; j++) {
            // Update the point shown
            document.querySelector("#result_point").innerHTML = `Points: ${game.point}`;
            document.querySelector("#result_mobile").innerHTML = `Points: ${game.point}`;
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
            document.querySelector("#question_mobile").innerHTML = emotionQuestion;
            // Check if player makes the right emotion
            let continuePlay = true;
            let answeredCorrectly = false;
            while (continuePlay && timer.getTimeUsed() < LEVELS_TIME[game.level]) {
                // Set interval to not block the event loop
                await sleep(async () => {
                    if (window.emotion === emotionQuestion && window.emotionTime >= 2) {
                        // Get the time used to get correct answer
                        const timeUsed = timer.getTimeUsed();
                        // Alter the variables of the game
                        game.correct(timeUsed);
                        // Update result board
                        document.querySelector(`#result_${j + 1}`).innerHTML = `
                            <div class="number_of_question">${j + 1}</div>
                            <div class="emotion_type">${emotionQuestion}</div>
                            <div class="right_or_wrong">
                                <i class="fa-solid fa-check"></i>
                            </div>
                        `;
                        // Set the parameters
                        answeredCorrectly = true;
                        continuePlay = false;
                        // Show correct div
                        document.querySelector("#correct_answer_container").style.display = "flex";
                        await sleep(() => {
                            document.querySelector("#correct_answer_container").style.display = "none";
                        }, 1000);
                    }
                }, 1);
            }
            // Stop timer
            timer.stop();
            if (!answeredCorrectly) {
                // Show wrong div
                document.querySelector("#wrong_answer_container").style.display = "flex";
                await sleep(() => {
                    document.querySelector("#wrong_answer_container").style.display = "none";
                }, 1000);
                // Update result board
                document.querySelector(`#result_${j + 1}`).innerHTML = `
                    <div class="number_of_question">${j + 1}</div>
                    <div class="emotion_type">${emotionQuestion}</div>
                    <div class="right_or_wrong">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                `;
            }
        }
        game.nextLevel();
    }
    // Relocate to summary page
    window.location.href = `../resultPage/result.html?points=${game.point}&correct=${game.correctAnswers}`;
}

gameStart();