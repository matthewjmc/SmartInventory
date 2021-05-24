FROM python:3.8

WORKDIR /Project

RUN pip3 install --no-cache pymysql
RUN pip3 install --no-cache paho-mqtt

COPY Backend.py .

CMD ["python3","Backend.py"]
