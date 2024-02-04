FROM python:3.10

WORKDIR /app

COPY . .

RUN pip install --trusted-host pypi.python.org -r requirements.txt

RUN apt-get update && apt-get install -y firefox-esr && \
    apt-get clean

EXPOSE 8000

CMD ["gunicorn", "-b", "0.0.0.0:8000", "--worker-class=gevent", "--worker-connections=1000", "--workers=3", "app:app"]