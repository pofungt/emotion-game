function camera() {
    cv['onRuntimeInitialized'] = ()=>{
        let videoWidth = 480;
        let videoHeight = 240;
        if (screen.width <= 550) {
            document.querySelector("#videoInput").setAttribute("width","350");
            document.querySelector("#canvasOutput").setAttribute("width","350");
            videoWidth = 350;
            videoHeight = 240;
        }
        const constraints = {
            audio: false,
            video: {
                width: videoWidth,
                height: videoHeight
            }
        }
        let video = document.getElementById('videoInput');
        navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function(err) {
            console.log("[Error]: " + err);
        });
        let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
        let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
        let gray = new cv.Mat();
        let cap = new cv.VideoCapture(videoInput);

        const FPS = 30;
        let loading = true;
        
        async function processVideo() {
            let begin = Date.now();
            cap.read(src);
            src.copyTo(dst);
            cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0);
            frame64 = getFrame();
            const res = await fetch('https://python.duncantang.dev/stream',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({img: frame64})
            });
            prediction = await res.json();

            let x = 0;
            let y = 0;
            let w = 0;
            let h = 0;
            let predictResult = "";
            let probability = 0;

            if (prediction) {
                if (prediction.uploaded) {
                    if (prediction.result.length) {
                        if (loading) {
                            document.querySelector("#loading-page").style.display = "none";
                            loading = false;
                        }
                        x = prediction.result[0].x;
                        y = prediction.result[0].y;
                        w = prediction.result[0].w;
                        h = prediction.result[0].h;
                        predictResult = prediction.result[0].predict;
                        probability = prediction.result[0].probability;
                    }
                }
            }
            if (!document.querySelector("#introModal").classList.contains("show")) {
                if (predictResult === "Happy") {
                    document.querySelector("#game_started_container").style.display = "block";
                    setInterval(()=>{
                        window.location.href = "./gamePage/game.html";
                    }, 2000);
                }
            }

            cv.rectangle(dst, new cv.Point(x, y), new cv.Point(x+w, y+h), new cv.Scalar(0, 0, 255, 255), 1, cv.LINE_AA, 0)
            cv.rectangle(dst, new cv.Point(x, y), new cv.Point(x+w, y+h), new cv.Scalar(50, 50, 255, 255), 2, cv.LINE_AA, 0)
            cv.rectangle(dst, new cv.Point(x, y-40), new cv.Point(x+w, y), new cv.Scalar(50, 50, 255, 255), -1, cv.LINE_AA, 0)
            cv.putText(dst, predictResult, new cv.Point(x, y-10),
                        cv.FONT_HERSHEY_SIMPLEX, 0.8, new cv.Scalar(255, 255, 255, 255), 2, cv.LINE_AA, 0)
            cv.imshow("canvasOutput", dst);
            // schedule next one.
            let delay = 1000/FPS - (Date.now() - begin);
            setTimeout(processVideo, delay);
        }

        function getFrame() {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            const data = canvas.toDataURL('image/jpeg');
            return data;
        }

        // schedule first one.
        setTimeout(processVideo, 0);
    };
}