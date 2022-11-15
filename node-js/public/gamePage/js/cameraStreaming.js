function camera() {
    cv['onRuntimeInitialized'] = async ()=>{
        let videoWidth = 320;
        let videoHeight = 240;
        if (window.innerWidth <= 440) {
            document.querySelector("#videoInput").setAttribute("width","280");
            document.querySelector("#canvasOutput").setAttribute("width","280");
            videoWidth = 280;
        }
        const constraints = {
            audio: false,
            video: {
                width: videoWidth,
                height: videoHeight
            }
        }
        let video = document.getElementById('videoInput');

        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            video.srcObject = stream;
            video.play();
        } catch (err) {
            console.log("[Error]: " + err);
        }

        let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
        let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
        let gray = new cv.Mat();
        let cap = new cv.VideoCapture(video);

        const FPS = 30;
        
        async function processVideo() {
            let begin = Date.now();
            cap.read(src);
            src.copyTo(dst);
            cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0);
            frame64 = getFrame();
            const res = await fetch('https://pythonAI.duncantang.dev/stream',{
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
                        x = prediction.result[0].x;
                        y = prediction.result[0].y;
                        w = prediction.result[0].w;
                        h = prediction.result[0].h;
                        predictResult = prediction.result[0].predict;
                        probability = prediction.result[0].probability;

                        if (predictResult === window.emotion) {
                            // Mark the number of frames that player maintains the same emotion
                            window.emotionTime ++;
                        } else {
                            window.emotion = predictResult;
                            // Player changes emotion, so reset the frame counter
                            window.emotionTime = 0;
                        }
                    }
                }
            }

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