import PIL
import io
import base64
import re
from models.model import Model
from sanic.response import json
from sanic.request import Request

model = Model()

async def stream(request: Request):
    try:
        image_json = request.json
        image = re.sub('^data:image/.+;base64,', '', image_json["img"])
        image = PIL.Image.open(io.BytesIO(base64.b64decode(image)))
        result = model.predict(image)
        if result:
            return json({
                "uploaded": True,
                "result": result
            })
        else:
            return json({
                "uploaded": False,
                "Error": "No Face Detected"
            })
    except Exception as e:
        print(e)
        return json({
            "uploaded": False,
            "Error": "Internal Error"
        })
