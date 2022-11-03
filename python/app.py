import cv2
import tensorflow as tf
import numpy as np
from sanic import Sanic
from sanic.response import json
from keras.models import load_model
import PIL
import io

IMG_SIZE = 48

app = Sanic("Emotion_Detection")

model = load_model('./utils/model_file.h5')
faceDetect = cv2.CascadeClassifier('./utils/haarcascade_frontalface_default.xml')

labels_dict = {0: 'Angry', 1: 'Disgust', 2: 'Fear',
               3: 'Happy', 4: 'Neutral', 5: 'Sad', 6: 'Surprise'}

@app.post('/predict')
async def predict(request):
    try:
        image = request.files.get("predict")
        image = PIL.Image.open(io.BytesIO(image.body))
        gray = cv2.cvtColor(np.array(image), cv2.COLOR_BGR2GRAY)
        faces = faceDetect.detectMultiScale(gray, 1.3, 3)
        result_array = []
        for x,y,w,h in faces:
            sub_face_img = gray[y:y+h, x:x+w]
            resized = cv2.resize(sub_face_img, (48, 48))
            normalized = resized / 255.0
            reshaped = np.reshape(normalized, (1, 48, 48, 1))
            predict_result = model.predict(reshaped)
            label = np.argmax(predict_result, axis=1)[0]
            probability = predict_result[0][label]
            prediction = labels_dict[label]
            result_array += [{
                "x": x.tolist(),
                "y": y.tolist(),
                "w": w.tolist(),
                "h": h.tolist(),
                "predict": prediction,
                "probability": round(probability.tolist(), 4)
            }]
        return json({
            "uploaded": True,
            "result": result_array
        })
    except:
        print("[Error] Unable to predict.")
        return json({
            "uploaded": False
        })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)