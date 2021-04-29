import json
import paho.mqtt.client as mqtt_client
import random
from flask import (
    Flask,
    render_template,
    request,
    redirect
)
from flask_socketio import SocketIO

# broker = 'iot2.mcmullin.org'
# port = 1883
# topic = "hihi"

broker = 'broker.emqx.io'
port = 1883
topic = "hihi"

client_1 = None

def on_connect(self, client, userdata, rc):
    print("MQTT Connected.")
    self.subscribe("test")

def on_message(client, userdata,msg):
    print(msg.payload.decode("utf-8", "strict"))
    message = json.loads(msg.payload.decode("utf-8", "strict"))
    if message["Command"] == "allowed" and message["Position"] == "admin":
        socketio.emit('redirect', 'http://localhost:5000/admin')
        
    elif message["Command"] == "allowed" and message["Position"] == "user":
        socketio.emit('redirect', 'http://localhost:5000/todo')

    elif message["Command"] == "admin":
        if 'Command' in message: 
            del message['Command']
            print(message)
        socketio.emit('administrator', message)

    elif message["Command"] == "borrow":
        if 'Command' in message: 
            del message['Command']
            print(message)
        socketio.emit('borrowdata', message)
    
    elif message["Command"] == "return":
        if 'Command' in message: 
            del message['Command']
            print(message)
        socketio.emit('returndata', message)

    else:
        socketio.emit('redirect', 'http://localhost:5000/welcome')



def on_log(client, userdata, level, buf):
    print("log: ",buf)

    
def publish(client, user):
    if user["Command"] == "register" or user["Command"] == "login":
        msg = f"messages: {user}"
        result = client.publish(topic, msg)
        status = result[0]
        if status == 0:
            print(f"Send `{msg}` to topic `{topic}`")
        else:
            print(f"Failed to send message to topic {topic}")

app = Flask(__name__)
app.static_folder = 'static'
socketio = SocketIO(app)


@app.route('/welcome')
def welcome():
    return render_template('welcome.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/admin')
def admin():
    return render_template('admin.html')

@app.route('/test/redirect')
def test_redirect():

    #login mock
    user = {"Command" : "allowed" , "Position" : "admin"}

    #borrow and return mock
    #user ={"Command": "borrow", "Name": "Monitor", "Amount" : "3"} 
    #user ={"Command": "return", "Name": "Hololens", "Amount" : "1"} 

    u = json.dumps(user)
    client_1.publish('test', u)
    return 'Success'


@app.route('/todo')
def todo():
    return render_template('todo.html')

#problem
@app.route('/borrow', methods = ['GET','POST'])
def borrow():
    
    return render_template('borrow.html')
    path = request.form['done']
    if request.method == 'GET':
        print('already post')
        user = {"Command" : 'done'}
        u = json.dumps(user)
        client_1.publish('test', u)

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
        u = json.dumps(user) #object to string

        client_1.publish('test', u)

    elif request.method == 'POST':
        msg = 'Please fill out the form !'
    return render_template('register.html')


if __name__=='__main__':
    app.jinja_env.auto_reload = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    client = mqtt_client.Client()

    client.on_connect = on_connect
    client.on_message = on_message

    client.on_log=on_log    
    client.connect(broker, port)
    client.loop_start()
    client_1 = client
    app.run(debug = True, host = "0.0.0.0")
# client.()
