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

broker = 'mqtt.balemoh.tech'
port = 1883

client_1 = None

def on_connect(self, client, userdata, rc):
    print("MQTT Connected.")
    self.subscribe("UI") 
    self.subscribe("hardware")


def on_message(client, userdata,msg):
    print(msg.payload.decode("utf-8", "strict"))
    message = json.loads(msg.payload.decode("utf-8", "strict"))
    
    if message["Command"] == "borrow" and "Role" in message:
        if message["Role"] == "Student" or message["Role"] == "Admin":
            socketio.emit('redirect', 'http://localhost:5000/stockborrow')
        else:
            socketio.emit('redirect', 'http://localhost:5000/decide')
    
    elif message["Command"] == "return" and "Role" in message:
        if message["Role"] == "Student" or message["Role"] == "Admin":
            socketio.emit('redirect', 'http://localhost:5000/stockreturn')
        else:
            socketio.emit('redirect', 'http://localhost:5000/decide')

    elif message["Command"] == "add" and "Role" in message:
        if message["Role"] == "Admin":
            socketio.emit('redirect', 'http://localhost:5000/stockadditems') 
        else:
            socketio.emit('redirect', 'http://localhost:5000/decide')
    
    elif message["Command"] == "updateitem" and "Role" in message:
        if message["Role"] == "Admin":
            socketio.emit('redirect', 'http://localhost:5000/stockadmin') 
        else:
            socketio.emit('redirect', 'http://localhost:5000/decide')

    elif message["Command"] == "updateitem" and "Amount" in message:
        if 'Command' in message: 
            del message['Command']
            print(message)
        socketio.emit('administrator', message)

    elif message["Command"] == "borrow" and "Amount" in message:
        if 'Command' in message : 
            del message['Command']
            print(message)
        socketio.emit('borrowdata', message)
    
    elif message["Command"] == "return" and "Amount" in message:
        if 'Command' in message: 
            del message['Command']
            print(message)
        socketio.emit('returndata', message)

    else:
        socketio.emit('redirect', 'http://localhost:5000/inventorystart')

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

@app.route('/test/redirect')
def test_redirect():

    #login mock
    #may = {"Command" : "borrow" , "Role" : "Student"}
    #may = {"Command" : "return" , "Role" : "Student"}
    #may = {"Command" : "add" , "Role" : "Admin"}
    #may = {"Command" : "updateitem" , "Role" : "Student"}

    #stock mock
    #leng ={"Command": "admin", "Name": "12345", "Amount" : "3"} 
    #leng ={"Command": "borrow", "StockID": "00000008", "Amount" : "1"} 
    #leng ={"Command": "returnitem", "Name": "Hololens", "Amount" : "1"} 

    #u = json.dumps(leng)
    #client_1.publish('UI', u)
    #return 'Success'

    l = json.dumps(may)
    client_1.publish('UI', l)
    return 'Success'
    
@app.route('/inventorystart')
def welcome():
    return render_template('inventorystart.html')


@app.route('/decide', methods = ['GET','POST'])
def decide():
    if request.method == 'POST':
        data = request.get_json()
        
        if data["Command"] == 'borrow':
            print("d")
            user = {"Command" : 'borrow'}
            u = json.dumps(user)
            client_1.publish('hardware', u)
        elif data["Command"] == 'return':
            user = {"Command" : 'return'}
            u = json.dumps(user)
            client_1.publish('hardware', u)
        elif data["Command"] == 'add':
            user = {"Command" : 'additem'}
            u = json.dumps(user)
            client_1.publish('hardware', u)
        elif data["Command"] == 'updateitem':
            user = {"Command" : 'updateitem'}
            u = json.dumps(user)
            client_1.publish('hardware', u)
    return render_template('decide.html')
    

@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/stockadmin', methods = ['GET','POST'])
def admin():
    if request.method == 'POST':
        data = request.get_json()
        if "Command" in data:
            user = {"Command" : 'updated'}
            u = json.dumps(user)
            client_1.publish('hardware', u)
        else:
            u = json.dumps(data["stock"])
            client_1.publish('hardware', u)
    return render_template('stockadmin.html')


@app.route('/stockadditems', methods = ['GET','POST'])
def adminadditem():
    if request.method == 'POST':
        data = request.get_json()
        u = json.dumps(data["items"])
        client_1.publish('hardware', u)
    return render_template('stockadditems.html')


@app.route('/stockborrow', methods = ['GET','POST'])
def borrow():
    if request.method == 'POST':
        print('already post')
        user = {"Command" : 'borrowed'}
        u = json.dumps(user)
        client_1.publish('hardware', u)
    return render_template('stockborrow.html')
    

@app.route('/stockreturn', methods = ['GET','POST'])
def returnStock():
    if request.method == 'POST':
        print('already post')
        user = {"Command" : 'returned'}
        u = json.dumps(user)
        client_1.publish('hardware', u)
    return render_template('stockreturn.html')

@app.route('/register', methods = ['GET','POST'])
def register():
    msg = ''
    if request.method == 'POST' and 'First Name' in request.form and 'Last Name' in request.form and 'ID' in request.form :
        Fname = request.form['First Name']
        Lname = request.form['Last Name']
        ID = request.form['ID']
        Finger = '''leng'''

        user = {"Command": 'enroll', "First Name": Fname, "Last Name": Lname, "userID": ID, "Finger": Finger}
        u = json.dumps(user) #object to string

        client_1.publish('leng', u)

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
