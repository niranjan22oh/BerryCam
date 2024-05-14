import numpy as np

# from tensorflow.lite import Interpreter for local windows run
import tensorflow as tf

gender_desc = {0:'Male', 1:'Female'}
eth_desc = {0:'White', 1:'Black', 2:'Asian', 3:'Indian', 4:'Others'}

class AttributeExtractor(object):

    def __init__(
        self,
        model_path='models/final_mnet_utkface.tflite',
        num_threads=1,
    ):
        self.interpreter = tf.lite.Interpreter(model_path=model_path,
                                               num_threads=num_threads)

        self.interpreter.allocate_tensors()
        self.input_details = self.interpreter.get_input_details()
        self.output_details = self.interpreter.get_output_details()

    def __call__(
        self,
        img,
    ):
        input_details_tensor_index = self.input_details[0]['index']
        self.interpreter.set_tensor(
            input_details_tensor_index, img)
        self.interpreter.invoke()

        age_details_tensor_index = self.output_details[0]['index']
        ethnicity_details_tensor_index = self.output_details[1]['index']
        gender_details_tensor_index = self.output_details[2]['index']

        age = self.interpreter.get_tensor(age_details_tensor_index)
        gender = self.interpreter.get_tensor(ethnicity_details_tensor_index)
        ethnicity = self.interpreter.get_tensor(gender_details_tensor_index)


        age = np.round(np.squeeze(age))
        ethnicity = eth_desc.get(np.argmax(np.squeeze(ethnicity)))
        gender = gender_desc.get(np.round(np.squeeze(gender)))

        res = {
            'Age': int(age),
            'Ethnicity': ethnicity,
            'Gender': gender
        }
        return res
    
