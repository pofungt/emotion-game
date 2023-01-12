from sanic import Sanic
from sanic_ext import Extend
from controllers.controller import stream

app = Sanic("Emotion_Detection")
app.config.CORS_ORIGINS = "http://localhost:8080,http://localhost:8000,https://emogame.duncantang.dev"
Extend(app)

app.add_route(stream, "/stream", methods=['POST'])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, single_process=True)