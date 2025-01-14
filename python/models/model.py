from keras.models import load_model
import cv2
import numpy as np

IMG_SIZE = 48

class Model():
    def __init__(self) -> None:
        self.labels_dict = {0: 'Angry', 1: 'Disgust', 2: 'Fear', 3: 'Happy', 4: 'Neutral', 5: 'Sad', 6: 'Surprise'}
        self.model = load_model('./utils/model_file.h5')
        self.faceDetect = cv2.CascadeClassifier('./utils/haarcascade_frontalface_default.xml')
    
    def predict(self, image):
        try:
            gray = cv2.cvtColor(np.array(image), cv2.COLOR_BGR2GRAY)
            faces = self.faceDetect.detectMultiScale(gray, 1.3, 3)
            if len(faces):
                result_array = []
                for x, y, w, h in faces:
                    sub_face_img = gray[y:y+h, x:x+w]
                    resized = cv2.resize(sub_face_img, (IMG_SIZE, IMG_SIZE))
                    normalized = resized / 255.0
                    reshaped = np.reshape(normalized, (1, IMG_SIZE, IMG_SIZE, 1))
                    predict_result = self.model.predict(reshaped)
                    label = np.argmax(predict_result, axis=1)[0]
                    probability = predict_result[0][label]
                    prediction = self.labels_dict[label]
                    result_array += [{
                        "x": x.tolist(),
                        "y": y.tolist(),
                        "w": w.tolist(),
                        "h": h.tolist(),
                        "predict": prediction,
                        "probability": round(probability.tolist(), 4)
                    }]
                    return result_array
        except Exception as e:
            print(e)
            raise Exception(e)