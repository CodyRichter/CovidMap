from fastapi import FastAPI, Form
# from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.cors import CORSMiddleware
import contextlib
from sqlalchemy import MetaData
import logging

from database_handler import pg_handler
from models import create_tables

app = FastAPI()

logger = logging.getLogger("api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    create_tables()


@app.get("/")
async def root():
    """
    Default endpoint for testing if the server is running
    :return: Positive JSON Message
    """
    return {"CovidMap Server is Running!"}


@app.post('/locations')
async def add_location(name: str = Form(...), lat: float = Form(...), lon: float = Form(...)):
    logger.debug("Adding Location:[" + name + "] at lat:[" + str(lat) + "] lon:[" + str(lon) + "].")
    pg_handler.add_location(name, lat, lon)
    loc = pg_handler.get_locations()
    return {'locations': loc}


@app.get('/locations')
async def get_all_locations():
    loc = pg_handler.get_locations()
    return {'locations': loc}


@app.get('/purge')
async def purge():
    pg_handler.delete_all_locations()