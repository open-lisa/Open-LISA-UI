FROM python:3.9-alpine

COPY . /

EXPOSE 5000

RUN pip install --upgrade pip && \
  pip install --no-cache-dir -r requirements.txt