FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

WORKDIR /app

COPY ./ /app

RUN pip --no-cache-dir install -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "4250", "--debug", "--reload-dir", "/app", "--log-level", "debug"]