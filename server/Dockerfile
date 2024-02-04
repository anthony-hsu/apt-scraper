FROM python:3.10

WORKDIR /

COPY . .

RUN ["pip", "install", "--trusted-host", "pypi.python.org", "-r", "requirements.txt"]

RUN apt-get update && apt-get install -y firefox-esr && \
    apt-get clean

EXPOSE $PORT

CMD gunicorn -b 0.0.0.0:$PORT --worker-class=gevent --worker-connections=1000 --workers=3 app:app