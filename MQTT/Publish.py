import random
import time
import json

from paho.mqtt import client as mqtt_client

broker = 'iot2.mcmullin.org'
port = 1883
topic = "hihi"
client_id = f'python-mqtt-bob'


def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def publish(client):
    data = json.load(open('client1.json',)) #any given file
    msg_count = 0


    if data['user']["command"] == "allowed" or data['user']["command"] == "denied":
        msg = f"messages: {data['user']['command']}"
        result = client.publish(topic, msg)
        status = result[0]
        if status == 0:
            print(f"Send `{msg}` to topic `{topic}`")
        else:
            print(f"Failed to send message to topic {topic}")
    elif data['user']["command"] == "register" or data['user']["command"] == "delete":
        msg = f"messages: {data}"
        result = client.publish(topic, msg)
        status = result[0]
        if status == 0:
            print(f"Send `{msg}` to topic `{topic}`")
        else:
            print(f"Failed to send message to topic {topic}")
    else:
        time.sleep(1)
        msg = f"messages: {msg_count}"
        result = client.publish(topic, msg)
        status = result[0]
        if status == 0:
            print(f"Send `{msg}` to topic `{topic}`")
        else:
            print(f"Failed to send message to topic {topic}")
        msg_count += 1
            


def run():
    client = connect_mqtt()
    time.sleep(5)
    client.loop_start()
    publish(client)


if __name__ == '__main__':
    run()