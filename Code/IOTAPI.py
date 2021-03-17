import flask
from flask import request,jsonify
from flask_mysqldb import MySQL
import sys
print(sys.version)

app = flask.Flask(__name__)
app.config["DEBUG"] = True
 
app.config['MYSQL_HOST'] = 'iot.mcmullin.org'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '123456789'
app.config['MYSQL_DB'] = 'MyDB'




@app.route('/', methods=['GET'])
def home():
    return "<h1>Wrong Page Man</h1><p>Only For API</p>"

app.run(host="0.0.0.0",port=9999)
