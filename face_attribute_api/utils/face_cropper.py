import mediapipe as mp
import cv2
import numpy as np

from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from numpy import ndarray

def get_cropped_face(image: ndarray) -> ndarray:
    # base_options = python.BaseOptions(model_asset_path='./models/blaze_face_short_range.tflite')
    # options = vision.FaceDetectorOptions(base_options=base_options)
    # detector = vision.FaceDetector.create_from_options(options)
    detector = cv2.CascadeClassifier('./models/haarcascade_face.xml')
    gray_img = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    results = detector.detectMultiScale(gray_img, scaleFactor=1.15,minNeighbors=5,minSize=(34, 35), flags=cv2.CASCADE_SCALE_IMAGE)


    image = image/255
    image = image.astype(np.float32)
    bbox = results[0]
    xmin, ymin = bbox[0], bbox[1]
    xmax, ymax = xmin+bbox[2], ymin+bbox[3]

    cropped_image = image[xmin:xmax, ymin:ymax]
    return cropped_image
