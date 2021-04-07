import random
import time
import json
from multiprocessing import Process
from paho.mqtt import client as mqtt_client

broker = 'iot2.mcmullin.org'
port = 1883
topic = "hihi"

#send
client_id1 = f'python-mqtt-bob'
#recieve
client_id2 = f'python-mqtt-{random.randint(0, 100)}'

#mock data = []
data1 = ["register","12345", "123123", "M", "B", "1", "True"]
data2 = '[{"command": "allowed", "userID": "12345", "bool": "True"}]'

data = data2

def toJson(data):
    user = {
            "Command":data[0],
            "userID": data[1], 
            "userPass": data[2],
            "FirstName": data[3], 
            "LastName": data[4], 
            "Year":data[5], 
            "Bool":data[6]
            }
    json.dumps(user)
    #print(user)
    return user 

def fromJson(data):
    todata = json.loads(data)
    # print(todata)
    return todata

def connect_mqtt():
    #connect to server that use to send
    def on_connect(client1, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client1 = mqtt_client.Client(client_id1)
    client1.on_connect = on_connect
    client1.connect(broker, port)

    return client1

def connect_mqtt2():
    #connect to server that use to recieve
    def on_connect(client2, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client2 = mqtt_client.Client(client_id2)
    client2.on_connect = on_connect
    client2.connect(broker, port)

    return client2

def publish(client1, data):
    # u = toJson(data)
    a = fromJson(data) 
    print(a[0]['command'])
    if data[0] == "register" or data[0] == "login":
        print(data[0])
        msg = f"messages: {u}"
        result = client1.publish(topic, msg)
        status = result[0]
        if status == 0:
            print(f"Send `{msg}` to topic `{topic}`")
        else:
            print(f"Failed to send message to topic {topic}")

    elif a[0]['command'] == "allowed" or a[0]['command'] == "denied":
        send = a[0]['bool']
        msg = f"messages: {send}"
        result = client1.publish(topic, msg)
        status = result[0]
        if status == 0:
            print(f"Send `{msg}` to topic `{topic}`")
        else:
            print(f"Failed to send message to topic {topic}")

def subscribe(client2: mqtt_client):
    def on_message(client2, userdata, msg):
        print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")

    client2.subscribe(topic)
    client2.on_message = on_message

def runPub():
    client1 = connect_mqtt()
    time.sleep(5)
    while True:
        client1.loop_start()
        time.sleep(5)
        publish(client1,data)

def runSub():
    client2 = connect_mqtt2()
    subscribe(client2)
    client2.loop_forever()
    print(client_id2)

if __name__ == '__main__':
    run1 = Process(target=runPub)
    run2 = Process(target=runSub)

    run1.start()
    run2.start()
    
    
    