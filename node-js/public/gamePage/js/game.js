import { sleep } from "./setTimeout.js";

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
    await sleep(()=>{countDownToStart.innerHTML = "2";}, 1000);
    await sleep(()=>{countDownToStart.innerHTML = "1";}, 1000);
    await sleep(()=>{countDownToStart.style.display = "none";}, 1000);
    
}

gameStart();