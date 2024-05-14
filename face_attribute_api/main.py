import numpy as np
import cv2
import base64
#Niranjan Imports
import io
from PIL import Image
from deepface import DeepFace
import os
import string
import urllib
import uuid
import pickle
import datetime
import time
import shutil
import face_recognition
import starlette
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.responses import FileResponse
#Additional Imports From fastapi File, UploadFile, Form, UploadFile,Response
from fastapi import FastAPI, WebSocket,File, UploadFile, Form, UploadFile,Response,Request,status
from fastapi.middleware.cors import CORSMiddleware
# from flask import request
from utils.face_cropper import get_cropped_face
from utils.attribute_extractor import AttributeExtractor


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Attendace Monitior Database 
ATTENDANCE_LOG_DIR = './logs'
DB_PATH = './db'
for dir_ in [ATTENDANCE_LOG_DIR, DB_PATH]:
    if not os.path.exists(dir_):
        os.mkdir(dir_)

extractor = AttributeExtractor(model_path='./models/final_mnet_utkface.tflite')

def get_attrs(img: np.ndarray):
    img = cv2.flip(img, 1)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img.flags.writeable = False

    cropped_img = get_cropped_face(img)
    cropped_img=cv2.resize(src=cropped_img, dsize=(128,128))
    cropped_img = cropped_img/255
    cropped_img = np.expand_dims(cropped_img.astype(np.float32), axis=0)
    attribs = extractor(img=cropped_img)
    return attribs

# @app.websocket('/get_attributes')
# async def get_attributes(ws: WebSocket):
#     await ws.accept()
#     try:
#         while True:
#             data = await ws.receive()

#             if data['text'] != 'null':
#                 face_bytes = bytes(str(data['text']), 'utf-8')
#                 face_bytes = face_bytes[face_bytes.find(b'/9'):]
#                 face_img = base64.b64decode(face_bytes)

#                 if len(data) != 0:
#                     np_img = np.frombuffer(face_img, np.uint8)
#                     cv_img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

#                     res = get_attrs(cv_img)
#                 print(res)
#             else:
#                 continue
#             if res is None:
#                 res = {'Error': 'Image not clear enough please adjust your camera!'}
#             await ws.send_json(res)
#     except IndexError as e:
#         ...
#Attendance Monitoring System Endpoints and code begins here
@app.post("/login")
async def login(file: UploadFile = File(...)):

    file.filename = f"{uuid.uuid4()}.png"
    contents = await file.read()

    # example of how you can save the file
    with open(file.filename, "wb") as f:
        f.write(contents)

    user_name, match_status = recognize(cv2.imread(file.filename))

    if match_status:
        epoch_time = time.time()
        date = time.strftime('%Y%m%d', time.localtime(epoch_time))
        with open(os.path.join(ATTENDANCE_LOG_DIR, '{}.csv'.format(date)), 'a') as f:
            f.write('{},{},{}\n'.format(user_name, datetime.datetime.now(), 'IN'))
            f.close()

    return {'user': user_name, 'match_status': match_status}


@app.post("/logout")
async def logout(file: UploadFile = File(...)):
    print("Hit")
    file.filename = f"{uuid.uuid4()}.png"
    contents = await file.read()

    # example of how you can save the file
    with open(file.filename, "wb") as f:
        f.write(contents)

    user_name, match_status = recognize(cv2.imread(file.filename))

    if match_status:
        epoch_time = time.time()
        date = time.strftime('%Y%m%d', time.localtime(epoch_time))
        with open(os.path.join(ATTENDANCE_LOG_DIR, '{}.csv'.format(date)), 'a') as f:
            f.write('{},{},{}\n'.format(user_name, datetime.datetime.now(), 'OUT'))
            f.close()

    return {'user': user_name, 'match_status': match_status}


@app.post("/register_new_user")
async def register_new_user(file: UploadFile = File(...), text=None):
    
    file.filename = f"{uuid.uuid4()}.png"
    contents = await file.read()

    # example of how you can save the file
    with open(file.filename, "wb") as f:
        f.write(contents)

    shutil.copy(file.filename, os.path.join(DB_PATH, '{}.png'.format(text)))
    
    embeddings = face_recognition.face_encodings(cv2.imread(file.filename))

    file_ = open(os.path.join(DB_PATH, '{}.pickle'.format(text)), 'wb')
    pickle.dump(embeddings, file_)
    print(file.filename, text)

    os.remove(file.filename)

    return {'registration_status': 200}


@app.get("/get_attendance_logs")
async def get_attendance_logs():

    filename = 'out.zip'

    shutil.make_archive(filename[:-4], 'zip', ATTENDANCE_LOG_DIR)

    ##return File(filename, filename=filename, content_type="application/zip", as_attachment=True)
    return starlette.responses.FileResponse(filename, media_type='application/zip',filename=filename)

@app.post("/get_race")
async def login_face():
    # known_faces = numpy.load('./encodings.npy')
    print("Get Race Hit")
    
    resp = Request.get_json()
    img = get_img_from_b64(resp['img'])
    cv2.imshow(img)
    res=  DeepFace.analyze(img)
    # print("Result is ",json.dumps(res))
    print("Dominantn Emotion " ,res[0]['dominant_gender'])
    return JSONResponse(content=jsonable_encoder(res[0]), status_code=status.HTTP_201_CREATED)
def recognize(img):
    # it is assumed there will be at most 1 match in the db

    embeddings_unknown = face_recognition.face_encodings(img)
    if len(embeddings_unknown) == 0:
        return 'no_persons_found', False
    else:
        embeddings_unknown = embeddings_unknown[0]

    match = False
    j = 0

    db_dir = sorted([j for j in os.listdir(DB_PATH) if j.endswith('.pickle')])
    # db_dir = sorted(os.listdir(DB_PATH))    
    print(db_dir)
    while ((not match) and (j < len(db_dir))):

        path_ = os.path.join(DB_PATH, db_dir[j])

        file = open(path_, 'rb')
        embeddings = pickle.load(file)[0]

        match = face_recognition.compare_faces([embeddings], embeddings_unknown)[0]

        j += 1

    if match:
        return db_dir[j - 1][:-7], True
    else:
        return 'unknown_person', False

def get_img_from_b64(b64_string):
    face_bytes = bytes(b64_string, 'utf-8')
    face_bytes = face_bytes[face_bytes.find(b'/9'):]
    im = Image.open(io.BytesIO(base64.b64decode(face_bytes)))
    
    im = np.array(im)
    
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000)