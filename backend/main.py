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


@app.post('/report/{location_id}')
async def report(location_id):
    loc = pg_handler.add_case_to_location(location_id)
    return loc


@app.post('/check_in/{location_id}')
async def report(location_id):
    loc = pg_handler.check_in_to_location(location_id)
    return loc


@app.post('/comments')
async def add_comment(location_id: int = Form(...), title: str = Form(...), comment: str = Form(...)):
    pg_handler.add_comment(location_id, title, comment)
    return {'comments': pg_handler.get_comments_by_location(location_id)}


@app.get('/comments/{location_id}')
async def get_comments(location_id):
    return {'comments': pg_handler.get_comments_by_location(location_id)}


@app.post('/search/{search_string}')
async def report(search_string=""):
    loc = pg_handler.get_locations_by_name(search_string)
    return {'locations': loc}


@app.post('/search')
async def report(search_string=""):
    loc = pg_handler.get_locations()
    return {'locations': loc}
