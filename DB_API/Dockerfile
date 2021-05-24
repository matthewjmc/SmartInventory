FROM python:3.8

WORKDIR /Project

RUN pip3 install pymysql
RUN pip3 install paho-mqtt

COPY Backend.py .

CMD ["python3","Backend.py"]
