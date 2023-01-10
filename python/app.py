import cv2
import numpy as np
from model import Model
from sanic import Sanic
from sanic.response import json
import PIL
import io
import base64
import re
from sanic_ext import Extend

IMG_SIZE = 48

app = Sanic("Emotion_Detection")
app.config.CORS_ORIGINS = "http://localhost:8080,http://localhost:8000,https://emogame.duncantang.dev"
Extend(app)

model = Model()

@app.post('/test')
async def test(request):
    try:
        image = request.files.get("test")
        image = PIL.Image.open(io.BytesIO(image.body))
        result = model.test(image)
        return json({
            "uploaded": True,
            "result": result
        })
    except Exception as e:
        print("Error: " + e)
        return json({
            "uploaded": False
        })

@app.post('/stream')
async def stream(request):
    try:
        image_json = request.json
        image = re.sub('^data:image/.+;base64,', '', image_json["img"])
        image = PIL.Image.open(io.BytesIO(base64.b64decode(image)))
        result = model.stream(image)
        return json({
            "uploaded": True,
            "result": result
        })
    except Exception as e:
        print("Error: " + e)
        return json({
            "uploaded": False
        })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, single_process=True)