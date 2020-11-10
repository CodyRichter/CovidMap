from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import logging
import asyncio
import requests


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


@app.get("/")
async def root():
    """
    Default endpoint for testing if the server is running
    :return: Positive JSON Message
    """
    return {"CovidMap Server is Running!"}

