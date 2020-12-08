FROM python:3.8-alpine
MAINTAINER bamboo2panda

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

RUN mkdir /reminders
WORKDIR /reminders
COPY ./reminders /reminders

RUN adduser -D user
USER user