
import json
from flask_mqtt import Mqtt
from flask import (
    Flask,
    render_template,
    request,
    redirect
)
#from paho.mqtt import client as mqtt_client
#from flask_socketio import SocketIO,emit,disconnect
'''
broker = 'iot2.mcmullin.org'
port = 1883
topic = "hihi"

client_id1 = f'python-mqtt-bob'
client_id2 = f'python-mqtt-{random.randint(0, 100)}'

def connect_mqtt1():
    #connect to server that use to send
    def on_connect(client1, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client1 = mqtt_client.Client(client1_id1)
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


def publish(client, user):
    if user["Command"] == "register" or user["Command"] == "login":
        msg = f"messages: {user}"
        result = client.publish(topic, msg)
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
'''

app = Flask(__name__)
app.static_folder = 'static'
#socket = SocketIO(app)

@app.route('/welcome')
def welcome():
    return render_template('welcome.html')

@app.route('/login', methods =['GET', 'POST'])
def login():
    user = {"Command": 'login'}
    json.dumps(user)

    #client1 = connect_mqtt1()
    #publish(client1, user)

    #change topic to recieve from katisak
    #client2 = connect_mqtt2()
    #subscribe(client2)

    #if msg["Command"] == 'allowed':
    #    emit('redirect',{'url': url_for('todo')})
    ##    None

    return render_template('login.html')

@app.route('/todo')
def todo():
    return render_template('todo.html')

#problem
@app.route('/borrow', methods = ['GET','POST'])
def borrow():
    return render_template('borrow.html')

@app.route('/return', methods = ['GET','POST'])
def returnStock():
    return render_template('return.html')

@app.route('/register', methods = ['GET','POST'])
def register():
    msg = ''
    if request.method == 'POST' and 'First Name' in request.form and 'Last Name' in request.form and 'ID' in request.form :
        Fname = request.form['First Name']
        Lname = request.form['Last Name']
        ID = request.form['ID']
        Finger = '''leng'''

        user = {"Command": 'register', "First Name": Fname, "Last Name": Lname, "userID": ID, "Finger": Finger}
        json.dumps(user)

        #client1 = connect_mqtt1()
        #publish(client1, user)

    elif request.method == 'POST':
        msg = 'Please fill out the form !'
    return render_template('register.html')

'''
#for client
socket.on('redirect', function(data){
    window.locaton = data.url;
});
'''
