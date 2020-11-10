from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import logging

from database_handler import pg_handler
from models import create_tables


app = FastAPI()


# Must have CORSMiddleware to enable localhost client and server
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5057",
    "http://localhost:5000",
    "http://localhost:6379",
]

logger = logging.getLogger("api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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


@app.get('/locations/{name}/{lat}/{lon}')
async def add_location(name, lat, lon):
    pg_handler.add_location(name, lat, lon)
    loc = pg_handler.get_location_by_coordinates(lat, lon)
    return {'location': loc}
