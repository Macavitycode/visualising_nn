# import numpy as np
# import tensorflow as tf
# import matplotlib.pyplot as plt
# from tensorflow import keras
# import json

# from tensorflow.keras.datasets import mnist
# data = {}
# (data['X_train'], data['Y_train']), (data['X_test'], data['Y_test']) = mnist.load_data()

def make_model(data=data):
    model=None
    data['X_train'] = data['X_train']/255.
    data['X_test'] = data['X_test']/255.
    
    data['X_train'] = data['X_train'].reshape((60000, 784, ))
    data['X_test'] = data['X_test'].reshape((10000, 784, ))
    
    model = keras.Sequential([
#         keras.layers.Flatten(input_shape=(28, 28)),
        
        keras.layers.Dense(16, activation='relu', input_shape=(784,)),
        keras.layers.Dense(10, activation='softmax')
    ])

    model.compile(optimizer='adam',
                  loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
                  metrics=['accuracy']
                 )
    return model

def fit_data(data, model):
    print(data['X_train'].shape)
    model.fit(data['X_train'], data['Y_train'], epochs=3,
              validation_data=(data['X_test'], data['Y_test']))
    return model

def train_model():
    data = {}
    (data['X_train'], data['Y_train']), (data['X_test'], data['Y_test']) = mnist.load_data()
    model = make_model(data=data)
    model = fit_data(data, model)
    
    _, test_acc = model.evaluate(data['X_test'],  data['Y_test'], verbose=2)
    print('\nTest accuracy:', test_acc)
    
    return model

def get_params(model):
    weights=[]
    for i in range(len(model.layers)):
#         weights.append(layer.get_weights()[0].tolist())
#         weights.append(layer.get_weights()[1].tolist())
        weights.append([model.layers[i].get_weights()[0].tolist(),
                        model.layers[i].get_weights()[1].tolist()])
    return weights

import json

def get_params_json(weights, ret_dict = False):
    dat = {}
    for i in range(len(weights)):
        sdat = {}
        sdat['weights'] = weights[i][0]
        sdat['biases'] = weights[i][1]
        print(len(weights[i][0]), len(weights[i][0][0]))
        dat['layer'+str(i)] = sdat
        print(len(dat['layer'+str(i)]['weights']), len(dat['layer'+str(i)]['weights'][0]))
    
    if ret_dict: return dat
    
    dat = json.dumps(dat)
    return dat
