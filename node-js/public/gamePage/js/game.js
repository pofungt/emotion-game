function gameStart() {
    const countDownToStart = document.querySelector("#count_down_to_start");
    countDownToStart.style.display = "flex";
    setInterval(()=>{
        countDownToStart.innerHTML = "2";
        setInterval(()=>{
            countDownToStart.innerHTML = "1";
            setInterval(()=>{
                countDownToStart.style.display = "none";
            },1000);
        }, 1000);
    }, 1000);
}