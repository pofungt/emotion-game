from keras.utils import plot_model
from keras.models import load_model
import os

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

model = load_model('./utils/model_file.h5')

plot_model(model, 
    to_file='model.png',
    show_shapes=True,
    show_dtype=True,
    show_layer_names=True,
    show_layer_activations=True)