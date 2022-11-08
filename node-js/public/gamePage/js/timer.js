export class Timer {
    constructor(countFrom) {
        this.countFrom = countFrom * 100;
        this.timeLeft = this.countFrom;
    }

    start() {
        this.timer = window.setInterval(()=>this.updateTimer(), 10);
        this.updateTimer();
    }

    updateTimer() {
        this.timeLeft = this.timeLeft - 1;
        if (this.timeLeft >= 0) {
            const left = ("0"+`${Math.floor(this.timeLeft / 100)}`).slice(-2);
            const right = ("0"+`${this.timeLeft % 100}`).slice(-2);
            document.querySelector("#left").innerHTML = left;
            document.querySelector("#colon").innerHTML = ":";
            document.querySelector("#right").innerHTML = right;
            console.log(this.timeLeft);
        } else {
            this.gameOver();
        }
    }

    gameOver() {
        window.clearInterval(this.timer);
    }
}