export class Timer {
    constructor(countFrom) {
        this.countFrom = countFrom * 100;
        this.timeLeft = this.countFrom;
    }

    start() {
        this.timer = window.setInterval(()=>this.tick(), 10);
        this.tick();
    }

    tick() {
        this.timeLeft = this.timeLeft - 1;
        if (this.timeLeft >= 0) {
            const left = ("0"+`${Math.floor(this.timeLeft / 100)}`).slice(-2);
            const right = ("0"+`${this.timeLeft % 100}`).slice(-2);
            document.querySelector("#left").innerHTML = left;
            document.querySelector("#colon").innerHTML = ":";
            document.querySelector("#right").innerHTML = right;
        } else {
            this.stop();
        }
    }

    stop() {
        window.clearInterval(this.timer);
    }

    getTimeUsed() {
        // Return in seconds
        return (this.countFrom - this.timeLeft) / 100;
    }
}