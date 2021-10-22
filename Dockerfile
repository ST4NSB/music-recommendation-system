FROM ubuntu:20.04
RUN apt-get update -y && apt-get install -y python3-pip python3-dev build-essential
RUN pip3 install --upgrade setuptools
RUN pip3 install --upgrade pip
COPY ./requirements.txt /app/requirements.txt
WORKDIR /server
RUN pip3 freeze > requirements.txt
RUN python3 -m pip install -r /app/requirements.txt
COPY . /server
ENTRYPOINT ["python3"]
CMD ["server.py"]