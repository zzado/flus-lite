FROM python:3
ENV PYTHONUNBUFFERED 1

RUN mkdir /flus-lite
WORKDIR /flus-lite

COPY ./docker/backend/python_requirements.txt /flus-lite/
RUN pip install --no-cache-dir -r python_requirements.txt

COPY ./backend /flus-lite/
