import tensorflow as tf

IMG_SIZE = 224
BATCH_SIZE = 32
base_learning_rate = 0.01
initial_epochs = 125
validation_steps = 20

train_dataset = tf.keras.preprocessing.image_dataset_from_directory(
    directory="./data/train",
    label_mode='categorical',
    image_size=[IMG_SIZE, IMG_SIZE],
    shuffle=True,
    batch_size=BATCH_SIZE
)

valid_dataset = tf.keras.preprocessing.image_dataset_from_directory(
    directory="./data/test",
    label_mode='categorical',
    image_size=[IMG_SIZE, IMG_SIZE],
    shuffle=True,
    batch_size=BATCH_SIZE
)


def format_example(image, label):
    image = tf.cast(image, tf.float32)
    image = (image / 127.5) - 1
    return image, label


train_dataset = train_dataset.map(format_example)
valid_dataset = valid_dataset.map(format_example)

IMG_SHAPE = (IMG_SIZE, IMG_SIZE, 3)
base_model = tf.keras.applications.ResNet50(
    input_shape=IMG_SHAPE,
    include_top=False,
    weights="imagenet"
)

for layer in base_model.layers:
    layer.trainable = False

flatten_layer = tf.keras.layers.Flatten()
prediction_layer = tf.keras.layers.Dense(7, activation='softmax')

x = base_model.output
x = flatten_layer(x)
x = prediction_layer(x)

model = tf.keras.Model(inputs=base_model.input, outputs=x)
model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=base_learning_rate), loss='categorical_crossentropy',
              metrics=['accuracy'])

print(model.summary())

loss0, accuracy0 = model.evaluate(valid_dataset, steps=validation_steps)
print(f"initial loss: {loss0:.2f}")
print(f"initial accuracy: {accuracy0:.2f}")

history = model.fit(
    train_dataset,
    epochs=initial_epochs,
    validation_data=valid_dataset
)

model.save('./model', overwrite=True)