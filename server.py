from fastapi import FastAPI,File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from uvicorn import run
from tensorflow.keras.utils import load_img,img_to_array
from models import build_covid_model, build_malaria_model, build_pneumonia_model
import os
import numpy as np
import io
import matplotlib.pyplot as plt
import base64

app = FastAPI()

origins = ["*"]
methods = ["*"]
headers = ["*"]

app.add_middleware(
    CORSMiddleware, 
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = methods,
    allow_headers = headers    
)


covid_model = build_covid_model()
covid_model.load_weights('Covid-19 Disease Diagnosis/model.h5')
malaria_model = build_malaria_model()
malaria_model.load_weights('Malaria Disease Diagnosis/Malaria.h5')
pneumonia_model = build_pneumonia_model()
pneumonia_model.load_weights("Pneumonia Disease Diagnosis/pneumonia.h5")




@app.post("/predict-covid")
async def predict_covid(file: UploadFile = File(...)):
    if not file:
        return {"error":"input image not found"}
    if not file.content_type.startswith("image/"):
        return {"error":"Only image files are accepted"}
    contents = await file.read()
    
    disease_class=['COVID', 'non-COVID']
    img = load_img(io.BytesIO(contents),color_mode="rgb",target_size=(64,64))
    x = img_to_array(img)
    x = np.expand_dims(x, axis = 0)
    x /= 255
    custom = covid_model.predict(x)
    a=custom[0]
    ind=np.argmax(a)
    return {"disease":disease_class[ind],"confidence":f"{a[ind] * 100:.2f}%"}


@app.post("/predict-malaria")
async def predict_covid(file: UploadFile = File(...)):
    if not file:
        return {"error":"input image not found"}
    if not file.content_type.startswith("image/"):
        return {"error":"Only image files are accepted"}
    contents = await file.read()
    
    disease_class=['Parasitized','Uninfected']
    img = load_img(io.BytesIO(contents),color_mode="rgb",target_size=(32,32))
    x = img_to_array(img)
    x = np.expand_dims(x, axis = 0)
    x /= 255
    custom = malaria_model.predict(x)
    a=custom[0]
    ind=np.argmax(a)
    return {"disease":disease_class[ind],"confidence":f"{a[ind] * 100:.2f}%"}


@app.post("/predict-pneumonia")
async def predict_covid(file: UploadFile = File(...)):
    if not file:
        return {"error":"input image not found"}
    if not file.content_type.startswith("image/"):
        return {"error":"Only image files are accepted"}
    contents = await file.read()
    
    disease_class=['PNEUMONIA','NORMAL']
    img = load_img(io.BytesIO(contents),color_mode="rgb",target_size=(64,64))
    x = img_to_array(img)
    x = np.expand_dims(x, axis = 0)
    x /= 255
    custom = pneumonia_model.predict(x)
    a=custom[0]
    ind=np.argmax(a)
    return {"disease":disease_class[ind],"confidence":f"{a[ind] * 100:.2f}%"}




@app.get("/")
async def root():
    return {"status":"server running..."}

    
if __name__ == "__main__":
	port = int(os.environ.get('PORT', 5000))
	run(app, host="0.0.0.0", port=port)